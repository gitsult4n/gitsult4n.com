// Static site is served from ./public by the assets layer; this Worker only answers /api/*.
// Form data is stored in D1. Nothing about a submission (email, name, IP) is ever logged.

const MAX_BODY = 8192;
const LIMITS = { email: 254, assistants: 80, name: 100, org: 120, role: 100, note: 500 };
const ASSISTANTS = ['ChatGPT', 'Gemini', 'Claude', 'Copilot', 'Perplexity', 'Meta AI', 'Other'];
const SEGMENTS = ['insurer', 'ad_agency', 'procurement', 'regulator', 'researcher', 'ai_vendor'];
const BUDGETS = ['lt_25k', '25k_100k', '100k_250k', 'gt_250k'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (data, status = 200, extra = {}) => new Response(JSON.stringify(data), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...extra },
});
const fail = (status, error, field) => json(field ? { ok: false, error, field } : { ok: false, error }, status);

class Invalid extends Error {
  constructor(field) { super(field); this.field = field; }
}

function text(body, key, max, required = true) {
  const v = body[key];
  if (v === undefined || v === null || v === '') {
    if (required) throw new Invalid(key);
    return '';
  }
  if (typeof v !== 'string') throw new Invalid(key);
  const s = v.trim();
  if ((required && !s) || s.length > max) throw new Invalid(key);
  return s;
}

function email(body) {
  const s = text(body, 'email', LIMITS.email).toLowerCase();
  if (!EMAIL_RE.test(s)) throw new Invalid('email');
  return s;
}

function parsePanel(body) {
  const country = text(body, 'country', 2).toUpperCase();
  if (!/^[A-Z]{2}$/.test(country)) throw new Invalid('country');
  const list = body.assistants;
  if (!Array.isArray(list) || !list.length || list.length > ASSISTANTS.length
    || !list.every((a) => ASSISTANTS.includes(a))) throw new Invalid('assistants');
  const assistants = ASSISTANTS.filter((a) => list.includes(a)).join(',');
  if (body.consent !== true) throw new Invalid('consent');
  return { email: email(body), country, assistants };
}

function parseBuyer(body) {
  const row = {
    name: text(body, 'name', LIMITS.name),
    org: text(body, 'org', LIMITS.org),
    role: text(body, 'role', LIMITS.role),
    email: email(body),
    segment: text(body, 'segment', 20),
    budget: text(body, 'budget', 20, false),
    note: text(body, 'note', LIMITS.note, false),
  };
  if (!SEGMENTS.includes(row.segment)) throw new Invalid('segment');
  if (row.budget && !BUDGETS.includes(row.budget)) throw new Invalid('budget');
  return row;
}

async function readJson(request) {
  if (!(request.headers.get('content-type') || '').toLowerCase().startsWith('application/json')) return fail(415, 'content_type');
  const declared = Number(request.headers.get('content-length'));
  if (declared > MAX_BODY) return fail(413, 'too_large');
  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > MAX_BODY) return fail(413, 'too_large');
  let body;
  try { body = JSON.parse(raw); } catch { return fail(400, 'bad_json'); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return fail(400, 'bad_json');
  return body;
}

async function submit(request, env, parse, insert) {
  if (env.FORM_LIMIT) {
    const { success } = await env.FORM_LIMIT.limit({ key: request.headers.get('cf-connecting-ip') || 'unknown' });
    if (!success) return fail(429, 'rate_limited');
  }
  const body = await readJson(request);
  if (body instanceof Response) return body;
  // Bots fill hidden fields; answer exactly like a success and store nothing.
  if (typeof body.website === 'string' && body.website !== '') return json({ ok: true });
  let row;
  try { row = parse(body); } catch (err) {
    if (err instanceof Invalid) return fail(400, 'invalid', err.field);
    throw err;
  }
  // INSERT OR IGNORE: a duplicate email gets the same response as a new one.
  await insert(env.DB, row);
  return json({ ok: true });
}

const insertPanel = (db, r) => db.prepare(
  'INSERT OR IGNORE INTO panel (email, country, assistants, consent_at) VALUES (?, ?, ?, ?)',
).bind(r.email, r.country, r.assistants, new Date().toISOString()).run();

const insertBuyer = (db, r) => db.prepare(
  'INSERT OR IGNORE INTO buyers (name, org, role, email, segment, budget, note) VALUES (?, ?, ?, ?, ?, ?, ?)',
).bind(r.name, r.org, r.role, r.email, r.segment, r.budget, r.note).run();

async function stats(env) {
  const row = await env.DB.prepare(
    'SELECT (SELECT count(*) FROM panel) AS panel, (SELECT count(*) FROM buyers) AS buyers, (SELECT count(DISTINCT country) FROM panel) AS countries',
  ).first();
  return json(
    { panel: row?.panel ?? 0, buyers: row?.buyers ?? 0, countries: row?.countries ?? 0 },
    200,
    { 'cache-control': 'public, max-age=30' },
  );
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (!pathname.startsWith('/api/')) return env.ASSETS.fetch(request);
    try {
      if (pathname === '/api/stats' && request.method === 'GET') return await stats(env);
      if (pathname === '/api/panel' && request.method === 'POST') return await submit(request, env, parsePanel, insertPanel);
      if (pathname === '/api/buyer' && request.method === 'POST') return await submit(request, env, parseBuyer, insertBuyer);
      if (['/api/stats', '/api/panel', '/api/buyer'].includes(pathname)) return fail(405, 'method_not_allowed');
      return fail(404, 'not_found');
    } catch {
      return fail(500, 'server_error');
    }
  },
};
