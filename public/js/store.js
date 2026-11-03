import { TYPES, FIELDS } from './data.js';
import { encryptText } from './codec.js';
import { telDigits } from './util.js';

const KEY = 'beacon.profiles.v1';

// Storage can throw (private mode, blocked site data); the app must still work without it.
function read() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
}
function write(list) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); return true; } catch { return false; }
}

export const store = {
  all: () => read().sort((a, b) => b.updated - a.updated),
  get: (id) => read().find((p) => p.id === id) || null,
  put(p) {
    const list = read().filter((x) => x.id !== p.id);
    list.push(p);
    return write(list);
  },
  del(id) { write(read().filter((p) => p.id !== id)); },
  merge(profiles) {
    const byId = new Map(read().map((p) => [p.id, p]));
    for (const p of profiles) byId.set(p.id, p);
    write([...byId.values()]);
  },
};

export function newProfile(t = 'm') {
  const now = Date.now();
  return { id: crypto.randomUUID(), t, f: {}, ct: [['', '', '']], priv: { text: '', pin: '', pin2: '' }, pv: null, pvFor: null, created: now, updated: now };
}

export function isProfile(p) {
  return p && typeof p.id === 'string' && TYPES[p.t] && p.f && typeof p.f === 'object' && Array.isArray(p.ct);
}

export const hasContent = (p) => Boolean(String(p.f.n || '').trim() || p.ct.some((c) => telDigits(c[2]).length >= 3));

export const pinReady = (p) => p.priv.text.trim() && p.priv.pin.length >= 6;

// Profile (editable, local) → payload object (what goes inside the QR).
export async function toPayload(p) {
  const o = { t: p.t };
  for (const k of TYPES[p.t].fields) {
    const v = p.f[k];
    if (FIELDS[k].kind === 'check') { if (v) o[k] = 1; } else if (v && String(v).trim()) o[k] = String(v).trim();
  }
  const ct = p.ct
    .filter((c) => telDigits(c[2]).length >= 3)
    .map(([n, r, ph]) => [String(n || '').trim(), String(r || '').trim(), telDigits(ph)]);
  if (ct.length) o.ct = ct;
  o.u = Math.floor(p.updated / 864e5);
  if (pinReady(p) && p.priv.pin === p.priv.pin2) {
    // Re-encrypt only when text or PIN changed, so the QR stays stable between visits.
    const src = `${p.priv.text.trim()}\0${p.priv.pin}`;
    if (p.pvFor !== src) {
      const blob = await encryptText(p.priv.text.trim(), p.priv.pin);
      if (`${p.priv.text.trim()}\0${p.priv.pin}` !== src) return toPayload(p);
      p.pv = blob;
      p.pvFor = src;
    }
    o.pv = p.pv;
  }
  return o;
}
