import { h } from './util.js';

let providersPromise;

export function loadProviders() {
  providersPromise ??= fetch('/api/ai/providers', { headers: { accept: 'application/json' } })
    .then((r) => (r.ok ? r.json() : { providers: [] }))
    .then((d) => d.providers || [])
    .catch(() => []);
  return providersPromise;
}

const PREF = 'beacon.ai.v1';
function readPref() { try { return JSON.parse(localStorage.getItem(PREF)) || {}; } catch { return {}; } }
function writePref(p) { try { localStorage.setItem(PREF, JSON.stringify(p)); } catch { /* ignore */ } }

// One shared choice for builder and helper views, remembered per browser.
export const choice = { provider: null, model: null, listeners: new Set() };

function resolve(list) {
  const pref = readPref();
  const p = list.find((x) => x.id === (choice.provider || pref.provider)) || list[0];
  const m = p.models.find((x) => x.id === (choice.model || pref.model)) ? (choice.model || pref.model) : p.default;
  choice.provider = p.id;
  choice.model = m;
  return p;
}

export function providerName(list) {
  return list.find((p) => p.id === choice.provider)?.name || '';
}

// Picker: service select + model select + honest note about where the text goes.
export function picker(list, labels) {
  const p0 = resolve(list);
  const service = h('select', { 'aria-label': labels.provider },
    list.map((p) => h('option', { value: p.id, selected: p.id === p0.id }, p.name)));
  const model = h('select', { 'aria-label': labels.model });
  const note = h('p', { class: 'ai-note', dir: 'auto' });
  const fillModels = () => {
    const p = list.find((x) => x.id === choice.provider);
    model.replaceChildren(...p.models.map((m) => h('option', { value: m.id, selected: m.id === choice.model }, m.label)));
    note.textContent = p.note;
  };
  service.addEventListener('change', () => {
    const p = list.find((x) => x.id === service.value);
    choice.provider = p.id;
    choice.model = p.default;
    writePref({ provider: choice.provider, model: choice.model });
    fillModels();
    choice.listeners.forEach((fn) => fn());
  });
  model.addEventListener('change', () => {
    choice.model = model.value;
    writePref({ provider: choice.provider, model: choice.model });
    choice.listeners.forEach((fn) => fn());
  });
  fillModels();
  return h('div', {}, h('div', { class: 'ai-bar' }, service, model), note);
}

export async function runAi(task, fields, { lang = 'en', type = 'm' } = {}) {
  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ task, fields, lang, type, provider: choice.provider, model: choice.model }),
  });
  const data = await res.json().catch(() => ({ ok: false, error: 'provider' }));
  if (!data.ok) throw Object.assign(new Error(data.error), { code: data.error });
  return data.fields;
}
