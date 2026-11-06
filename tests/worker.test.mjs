import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/worker.js';

function makeEnv({ allow = true } = {}) {
  const tables = { panel: [], buyers: [] };
  const DB = {
    prepare(sql) {
      let args = [];
      const stmt = {
        bind(...a) { args = a; return stmt; },
        async run() {
          const table = /INTO (\w+)/.exec(sql)[1];
          if (tables[table].some((r) => r[0] === (table === 'panel' ? args[0] : args[3]))) return { meta: { changes: 0 } };
          tables[table].push(args);
          return { meta: { changes: 1 } };
        },
        async first() {
          return {
            panel: tables.panel.length,
            buyers: tables.buyers.length,
            countries: new Set(tables.panel.map((r) => r[1])).size,
          };
        },
        async all() { return { results: [] }; },
      };
      return stmt;
    },
  };
  const FORM_LIMIT = { limit: async () => ({ success: allow }) };
  return { DB, FORM_LIMIT, ASSETS: { fetch: async () => new Response('asset') }, tables };
}

const call = (env, path, init = {}) => worker.fetch(new Request(`https://x.test${path}`, init), env);
const post = (env, path, body, headers = { 'content-type': 'application/json' }) => call(env, path, {
  method: 'POST', headers, body: typeof body === 'string' ? body : JSON.stringify(body),
});

const panel = (o = {}) => ({ email: 'A@Example.com ', country: 'sa', assistants: ['ChatGPT', 'Claude'], consent: true, website: '', ...o });
const buyer = (o = {}) => ({
  name: 'Ann', org: 'Acme', role: 'Head of AI', email: 'ann@acme.com', segment: 'insurer', budget: '25k_100k', note: 'hi', website: '', ...o,
});

test('valid panel submission is normalized and stored', async () => {
  const env = makeEnv();
  const res = await post(env, '/api/panel', panel());
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
  assert.equal(env.tables.panel[0][0], 'a@example.com');
  assert.equal(env.tables.panel[0][1], 'SA');
  assert.equal(env.tables.panel[0][2], 'ChatGPT,Claude');
});

test('valid buyer submission is stored', async () => {
  const env = makeEnv();
  const res = await post(env, '/api/buyer', buyer());
  assert.equal(res.status, 200);
  assert.equal(env.tables.buyers.length, 1);
});

test('honeypot returns 200 and stores nothing', async () => {
  const env = makeEnv();
  assert.equal((await post(env, '/api/panel', panel({ website: 'http://spam' }))).status, 200);
  assert.equal((await post(env, '/api/buyer', buyer({ website: 'x' }))).status, 200);
  assert.equal(env.tables.panel.length + env.tables.buyers.length, 0);
});

test('duplicate email returns the same 200 response', async () => {
  const env = makeEnv();
  const a = await post(env, '/api/panel', panel());
  const b = await post(env, '/api/panel', panel({ email: 'a@example.com' }));
  assert.equal(b.status, 200);
  assert.deepEqual(await b.json(), await a.json());
  assert.equal(env.tables.panel.length, 1);
});

test('invalid fields return 400 with the field name', async () => {
  const env = makeEnv();
  const cases = [
    ['/api/panel', panel({ email: 'nope' }), 'email'],
    ['/api/panel', panel({ email: `${'a'.repeat(250)}@x.co` }), 'email'],
    ['/api/panel', panel({ consent: false }), 'consent'],
    ['/api/panel', panel({ country: 'SAU' }), 'country'],
    ['/api/panel', panel({ assistants: ['Bard'] }), 'assistants'],
    ['/api/panel', panel({ assistants: [] }), 'assistants'],
    ['/api/buyer', buyer({ segment: 'pirate' }), 'segment'],
    ['/api/buyer', buyer({ name: 'n'.repeat(101) }), 'name'],
    ['/api/buyer', buyer({ org: 'o'.repeat(121) }), 'org'],
    ['/api/buyer', buyer({ note: 'n'.repeat(501) }), 'note'],
    ['/api/buyer', buyer({ budget: 'lots' }), 'budget'],
    ['/api/buyer', buyer({ role: '' }), 'role'],
  ];
  for (const [path, body, field] of cases) {
    const res = await post(env, path, body);
    assert.equal(res.status, 400, field);
    assert.equal((await res.json()).field, field);
  }
  assert.equal(env.tables.panel.length + env.tables.buyers.length, 0);
});

test('non-JSON content type and malformed body are rejected', async () => {
  const env = makeEnv();
  assert.equal((await post(env, '/api/panel', 'x', { 'content-type': 'text/plain' })).status, 415);
  assert.equal((await post(env, '/api/panel', '{nope')).status, 400);
});

test('oversized body returns 413', async () => {
  const env = makeEnv();
  const res = await post(env, '/api/buyer', buyer({ note: 'x'.repeat(9000) }));
  assert.equal(res.status, 413);
});

test('rate limiter returns 429', async () => {
  const env = makeEnv({ allow: false });
  const res = await post(env, '/api/panel', panel());
  assert.equal(res.status, 429);
  assert.equal(env.tables.panel.length, 0);
});

test('stats returns real counts with cache header', async () => {
  const env = makeEnv();
  await post(env, '/api/panel', panel());
  await post(env, '/api/panel', panel({ email: 'b@example.com', country: 'US' }));
  await post(env, '/api/buyer', buyer());
  const res = await call(env, '/api/stats');
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('cache-control'), 'public, max-age=30');
  assert.deepEqual(await res.json(), { panel: 2, buyers: 1, countries: 2 });
});

test('unknown api route is 404 JSON; other paths go to assets', async () => {
  const env = makeEnv();
  const res = await call(env, '/api/nope');
  assert.equal(res.status, 404);
  assert.equal((await res.json()).ok, false);
  assert.equal(await (await call(env, '/')).text(), 'asset');
});
