import { UI, R, RESP_LANGS } from './i18n.js';
import { loadProviders, picker, runAi, choice, providerName } from './ai.js';
import { TYPES, FIELDS, MAX_CONTACTS, SAMPLES } from './data.js';
import { encodeProfile, decodeProfile, PAYLOAD_RE } from './codec.js';
import { makeQR, qrVersion, qrCanvas } from './qr.js';
import { renderResponder, renderBroken, pickLang } from './responder.js';
import { store, newProfile, isProfile, hasContent, toPayload } from './store.js';
import { DEVICES, wallpaper, downloadPng, downloadSvg, downloadIcs, printCard, printBands, printStickers, criticalLine } from './outputs.js';
import { h, $, $$, debounce, toast, download, icon, dayNumber, fill } from './util.js';

const pref = {
  get: (k, d) => { try { return localStorage.getItem(k) ?? d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
};

let lang = pref.get('beacon.lang', (navigator.language || '').startsWith('ar') ? 'ar' : 'en');
const t = (k) => UI[lang][k] ?? UI.en[k] ?? k;
const label = (k) => (R[lang] || R.en)[k];

// ---------- chrome: language, theme, views

function applyLang() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  for (const el of $$('[data-i18n]')) el.innerHTML = t(el.dataset.i18n);
  $('#lang-toggle').textContent = lang === 'ar' ? 'EN' : 'ع';
}

function applyTheme(mode) {
  if (mode === 'auto') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = mode;
}

const VIEWS = ['landing', 'create', 'mine', 'card'];
function show(view) {
  for (const v of VIEWS) $(`#view-${v}`).hidden = v !== view;
  document.body.dataset.view = view;
}

async function samplePayload(type) {
  return encodeProfile({ ...SAMPLES[type], u: dayNumber() - 12 });
}

// ---------- router

let cardPayload = null;
let respLang = pickLang();

async function route() {
  const hash = decodeURIComponent(location.hash.slice(1));
  if (PAYLOAD_RE.test(hash)) return showCard(hash);
  if (hash === 'create') return showCreate(null);
  if (hash.startsWith('edit/')) return showCreate(hash.slice(5));
  if (hash === 'mine') return showMine();
  document.title = 'Beacon — when you can’t speak, your Beacon will';
  show('landing');
  const target = hash && document.getElementById(hash);
  if (target) target.scrollIntoView({ behavior: 'smooth' }); else window.scrollTo(0, 0);
}

let cardTranslation = null; // { payload, lang, data } — AI translation the helper asked for

async function showCard(payload) {
  if (cardTranslation?.payload !== payload) cardTranslation = null;
  cardPayload = payload;
  const wasCard = document.body.dataset.view === 'card';
  show('card');
  if (!wasCard) window.scrollTo(0, 0);
  const root = $('#card-root');
  const onLang = (l) => { respLang = l; showCard(cardPayload); };
  try {
    const d = await decodeProfile(payload);
    document.title = `${d.n || 'Beacon'} — Beacon`;
    const translated = cardTranslation?.lang === respLang ? cardTranslation.data : null;
    const slot = h('section', { class: 'resp-ai' });
    renderResponder(root, translated || d, { lang: respLang, onLang, aiSlot: slot });
    cardAi(slot, d, Boolean(translated));
  } catch {
    document.title = 'Beacon';
    renderBroken(root, { lang: respLang, onLang });
  }
}

const PUBLIC_TEXT = ['hw', 'al', 'md', 'cd', 'lg', 'ad', 'gp', 'dr', 'sp', 'br', 'nat'];

function aiFields(data, keys, contacts) {
  const fields = {};
  for (const k of keys) if (typeof data[k] === 'string' && data[k].trim()) fields[k] = data[k];
  contacts.forEach((c, i) => { if (c?.[1]?.trim()) fields[`rel${i}`] = c[1]; });
  return fields;
}

async function cardAi(slot, d, isTranslated) {
  const list = await loadProviders();
  const L = R[respLang] || R.en;
  if (!list.length) { slot.remove(); return; }
  const note = h('p');
  const setNote = () => { note.textContent = fill(L.ai_note, { p: providerName(list) }); };
  choice.listeners.clear();
  choice.listeners.add(setNote);
  setNote();
  const status = h('p', { role: 'status' });
  const options = h('details', {}, h('summary', {}, h('small', {}, L.ai_options)),
    picker(list, { provider: L.ai_options, model: L.ai_options }));

  if (isTranslated) {
    slot.append(h('p', { class: 'resp-translated' }, '✨ ', L.ai_done),
      h('button', { type: 'button', class: 'btn-chip', onclick: () => { cardTranslation = null; showCard(cardPayload); } }, L.ai_original));
    return;
  }
  const btn = h('button', { type: 'button', class: 'btn-chip' }, '✨ ', h('span', {}, L.ai_translate));
  btn.addEventListener('click', async () => {
    btn.disabled = true;
    status.replaceChildren(h('span', { class: 'ai-busy' }, '…'));
    try {
      const out = await runAi('translate', aiFields(d, PUBLIC_TEXT, d.ct || []), { lang: respLang, type: d.t });
      const data = structuredClone(d);
      for (const [k, v] of Object.entries(out)) {
        if (k.startsWith('rel')) { const c = data.ct?.[+k.slice(3)]; if (c) c[1] = v; } else data[k] = v;
      }
      cardTranslation = { payload: cardPayload, lang: respLang, data };
      showCard(cardPayload);
    } catch {
      status.textContent = L.ai_err;
      btn.disabled = false;
    }
  });
  slot.append(btn, note, status, options);
}

// ---------- builder

let cur = null;
let out = null; // { url, qr, data } for the current builder state
let pendingType = 'm';
const regen = debounce(generate, 220);

function showCreate(id) {
  const saved = id && store.get(id);
  cur = saved ? structuredClone(saved) : newProfile(pendingType);
  cur.priv.pin2 ??= cur.priv.pin;
  document.title = `${t('b_title')} — Beacon`;
  show('create');
  window.scrollTo(0, 0);
  buildForm();
  generate();
}

function touch() {
  cur.updated = Date.now();
  if (hasContent(cur)) {
    store.put(cur);
    if (location.hash !== `#edit/${cur.id}`) history.replaceState(null, '', `#edit/${cur.id}`);
    $('#b-saved').hidden = false;
  }
  regen();
}

function buildForm() {
  const picker = $('#type-picker');
  picker.replaceChildren(...Object.keys(TYPES).map((k) => h('button', {
    type: 'button', class: 'type-opt', role: 'radio', 'aria-checked': String(cur.t === k), style: `--accent:${TYPES[k].color}`,
    onclick: () => { cur.t = k; pendingType = k; buildForm(); touch(); },
  }, icon(TYPES[k].icon), h('span', {}, t('t_' + k)))));

  $('#fields').replaceChildren(...TYPES[cur.t].fields.map(fieldEl));
  buildContacts();

  const pv = cur.priv;
  const pText = $('#p-text'); const pPin = $('#p-pin'); const pPin2 = $('#p-pin2');
  pText.value = pv.text; pPin.value = pv.pin; pPin2.value = pv.pin2 || '';
  pText.oninput = () => { pv.text = pText.value; pinState(); touch(); };
  pPin.oninput = () => { pv.pin = pPin.value; pinState(); touch(); };
  pPin2.oninput = () => { pv.pin2 = pPin2.value; pinState(); touch(); };
  $('#private').open = Boolean(pv.text);
  pinState();
  $('#b-saved').hidden = !store.get(cur.id);
  $('#b-delete').hidden = !store.get(cur.id);
}

function pinState() {
  const pv = cur.priv;
  const el = $('#p-state');
  el.className = 'pin-state';
  if (!pv.text.trim() && !pv.pin) { el.textContent = ''; return; }
  if (pv.pin.length < 6) { el.textContent = t('b_pin_short'); return; }
  if (pv.pin !== pv.pin2) { el.textContent = t('b_pin_bad'); return; }
  if (pv.text.trim()) { el.textContent = '✓ ' + t('b_pin_ok'); el.classList.add('ok'); }
}

function fieldEl(k) {
  const def = FIELDS[k];
  const id = `f-${k}`;
  const ph = k === 'hw' ? t('ph_hw_' + cur.t) : k === 'n' && cur.t === 'p' ? t('ph_n_p') : t('ph_' + k);
  const set = (v) => { cur.f[k] = v; touch(); };
  const value = cur.f[k] ?? '';
  if (def.kind === 'check') {
    return h('label', { class: 'field field-check' },
      h('input', { type: 'checkbox', id, checked: Boolean(value), onchange: (e) => set(e.target.checked ? 1 : 0) }),
      h('span', {}, label(k)));
  }
  let input;
  if (def.kind === 'select') {
    input = h('select', { id, onchange: (e) => set(e.target.value) },
      def.options.map((o) => h('option', { value: o, selected: o === value }, o || '—')));
  } else if (def.kind === 'area') {
    input = h('textarea', { id, rows: k === 'hw' ? 3 : 2, maxlength: def.max, placeholder: ph, dir: 'auto', oninput: (e) => set(e.target.value) });
    input.value = value;
  } else {
    input = h('input', { id, type: 'text', maxlength: def.max, placeholder: ph, dir: 'auto', autocomplete: 'off', oninput: (e) => set(e.target.value) });
    input.value = value;
  }
  const wide = def.kind === 'area' || k === 'ad' || k === 'gp';
  return h('div', { class: 'field' + (wide ? ' field-wide' : '') + (def.critical ? ' field-critical' : '') },
    h('label', { for: id }, label(k)), input);
}

function buildContacts() {
  const box = $('#contacts');
  box.replaceChildren(...cur.ct.map((c, i) => {
    const inp = (j, ph, type = 'text') => {
      const el = h('input', { type, placeholder: ph, 'aria-label': ph, dir: j === 2 ? 'ltr' : 'auto', inputmode: j === 2 ? 'tel' : null, maxlength: j === 2 ? 20 : 40, oninput: (e) => { c[j] = e.target.value; touch(); } });
      el.value = c[j] || '';
      return el;
    };
    return h('div', { class: 'contact-row' },
      h('span', { class: 'contact-n' }, String(i + 1)),
      inp(0, t('b_c_name')), inp(1, t('ph_c_rel')), inp(2, '+966 5x xxx xxxx', 'tel'),
      cur.ct.length > 1 ? h('button', { type: 'button', class: 'icon-btn', 'aria-label': t('b_remove'), onclick: () => { cur.ct.splice(i, 1); buildContacts(); touch(); } }, '×') : h('span'));
  }));
  $('#add-contact').disabled = cur.ct.length >= MAX_CONTACTS;
}

async function generate() {
  const box = $('#qr-box');
  const meter = $('#qr-meter');
  const note = $('#qr-note');
  const preview = $('#preview-root');
  const data = await toPayload(cur);
  renderResponder(preview, data, { lang, preview: true });
  $$('.needs-qr').forEach((el) => el.toggleAttribute('disabled', true));
  out = null;
  if (!hasContent(cur)) {
    box.replaceChildren(h('div', { class: 'qr-empty' }, icon(TYPES[cur.t].icon), h('p', {}, t('b_need'))));
    meter.style.setProperty('--fill', '0');
    note.textContent = '';
    return;
  }
  const url = `${location.origin}/#${await encodeProfile(data)}`;
  let qr;
  try { qr = makeQR(url); } catch {
    box.replaceChildren(h('div', { class: 'qr-empty is-bad' }, h('p', {}, t('b_too_big'))));
    meter.style.setProperty('--fill', '1');
    meter.dataset.level = 'big';
    note.textContent = t('b_too_big');
    return;
  }
  out = { url, qr, data };
  const canvas = qrCanvas(qr, 640, { margin: 3 });
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'QR code');
  box.replaceChildren(canvas);
  const v = qrVersion(qr);
  const level = v <= 10 ? 'ok' : v <= 16 ? 'mid' : 'big';
  meter.style.setProperty('--fill', String(Math.min(1, v / 25)));
  meter.dataset.level = level;
  note.textContent = `${t('b_size_' + level)} · v${v} · ${url.length} chars`;
  $$('.needs-qr').forEach((el) => el.removeAttribute('disabled'));
  $('#b-share').hidden = !navigator.share;
}

function wireBuilder() {
  $('#add-contact').addEventListener('click', () => {
    if (cur.ct.length < MAX_CONTACTS) { cur.ct.push(['', '', '']); buildContacts(); $('#contacts .contact-row:last-child input').focus(); }
  });
  $('#b-test').addEventListener('click', () => out && window.open(out.url, '_blank', 'noopener'));
  $('#b-copy').addEventListener('click', async () => {
    if (!out) return;
    try { await navigator.clipboard.writeText(out.url); } catch {
      const ta = h('textarea', { class: 'sr-only' }, out.url);
      document.body.append(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    toast(t('b_copied'));
  });
  $('#b-share').addEventListener('click', () => out && navigator.share({ title: `Beacon — ${out.data.n || ''}`, url: out.url }).catch(() => {}));
  $('#b-new').addEventListener('click', () => { if (location.hash === '#create') showCreate(null); else location.hash = 'create'; });
  armDelete($('#b-delete'), () => { store.del(cur.id); location.hash = 'mine'; });

  const dev = $('#w-device');
  dev.replaceChildren(...Object.entries(DEVICES).map(([k, d]) => h('option', { value: k }, d.label)));
  if (/Android/i.test(navigator.userAgent)) dev.value = 'android';
  $('#w-download').addEventListener('click', () => out && wallpaper(out.data, out.qr, dev.value, $('#w-style').value));
  $('#o-card').addEventListener('click', () => out && printCard(out.data, out.qr));
  $('#o-band').addEventListener('click', () => out && printBands(out.data, out.qr));
  $('#o-sticker').addEventListener('click', () => out && printStickers(out.data, out.qr));
  $('#o-png').addEventListener('click', () => out && downloadPng(out.data, out.qr));
  $('#o-svg').addEventListener('click', () => out && downloadSvg(out.data, out.qr));
  $('#o-ics').addEventListener('click', () => out && downloadIcs(out.data, out.url));
}

async function initBuilderAi() {
  const list = await loadProviders();
  if (!list.length) return;
  $('#ai-card').hidden = false;
  $('#ai-picker').replaceChildren(picker(list, { provider: t('ai_provider'), model: t('ai_model') }));
  const sel = $('#ai-lang');
  sel.replaceChildren(...Object.entries(RESP_LANGS).map(([k, v]) => h('option', { value: k }, v)));
  sel.value = lang === 'en' ? 'ar' : 'en';
  $('#ai-polish').addEventListener('click', () => aiAction('polish'));
  $('#ai-tips').addEventListener('click', () => aiAction('tips'));
  $('#ai-translate').addEventListener('click', () => aiAction('translate'));
}

async function aiAction(task) {
  const box = $('#ai-result');
  const typeFields = TYPES[cur.t].fields;
  const keys = (task === 'translate' ? PUBLIC_TEXT : ['hw', 'al', 'md', 'cd']).filter((k) => typeFields.includes(k));
  const fields = aiFields(cur.f, keys, task === 'translate' ? cur.ct : []);
  if (!Object.keys(fields).length || (task === 'tips' && !fields.cd && !fields.md && !fields.al && !fields.hw)) {
    box.replaceChildren(h('p', { class: 'muted small' }, t('ai_nothing')));
    return;
  }
  const buttons = $$('#ai-card .ai-actions button');
  buttons.forEach((b) => { b.disabled = true; });
  box.replaceChildren(h('p', { class: 'ai-busy' }, t('ai_busy')));
  try {
    const out = await runAi(task, fields, { lang: task === 'translate' ? $('#ai-lang').value : lang, type: cur.t });
    const rows = Object.entries(out).flatMap(([k, v]) => [
      h('dt', {}, k.startsWith('rel') ? `${t('b_c_rel')} ${+k.slice(3) + 1}` : label(k)),
      fields[k] && fields[k] !== v ? h('dd', { class: 'ai-was', dir: 'auto' }, fields[k]) : null,
      h('dd', { dir: 'auto' }, v)]);
    box.replaceChildren(h('div', { class: 'ai-result' },
      h('dl', {}, rows),
      h('div', { class: 'row' },
        h('button', { type: 'button', class: 'btn btn-primary btn-sm', onclick: () => {
          for (const [k, v] of Object.entries(out)) {
            if (k.startsWith('rel')) { if (cur.ct[+k.slice(3)]) cur.ct[+k.slice(3)][1] = v; } else cur.f[k] = v;
          }
          box.replaceChildren();
          buildForm();
          touch();
        } }, t('ai_apply')),
        h('button', { type: 'button', class: 'btn btn-quiet btn-sm', onclick: () => box.replaceChildren() }, t('ai_discard')))));
  } catch (err) {
    const msg = err.code === 'quota' ? t('ai_err_quota') : err.code === 'rate' ? t('ai_err_rate') : t('ai_err');
    box.replaceChildren(h('p', { class: 'small', style: 'color:var(--bad)' }, msg));
  } finally {
    buttons.forEach((b) => { b.disabled = false; });
  }
}

// Two taps instead of a confirm() dialog.
function armDelete(btn, action) {
  let armed = false;
  let timer;
  btn.addEventListener('click', () => {
    if (armed) { clearTimeout(timer); armed = false; btn.textContent = t('b_delete'); action(); return; }
    armed = true;
    btn.textContent = t('b_delete_confirm');
    btn.classList.add('armed');
    timer = setTimeout(() => { armed = false; btn.textContent = t('b_delete'); btn.classList.remove('armed'); }, 3000);
  });
}

// ---------- my beacons

async function showMine() {
  document.title = `${t('mine_title')} — Beacon`;
  show('mine');
  window.scrollTo(0, 0);
  const list = $('#mine-list');
  const all = store.all();
  $('#mine-empty').hidden = all.length > 0;
  list.replaceChildren();
  for (const p of all) {
    const data = await toPayload(p);
    const payload = await encodeProfile(data);
    let thumb;
    try { thumb = qrCanvas(makeQR(`${location.origin}/#${payload}`), 220, { margin: 2 }); } catch { thumb = h('div', { class: 'qr-empty is-bad' }, '!'); }
    const del = h('button', { type: 'button', class: 'btn btn-quiet btn-danger' }, t('b_delete'));
    armDelete(del, () => { store.del(p.id); showMine(); });
    list.append(h('article', { class: 'mine-card', style: `--accent:${TYPES[p.t].color}` },
      h('div', { class: 'mine-qr' }, thumb),
      h('div', { class: 'mine-info' },
        h('span', { class: 'chip' }, icon(TYPES[p.t].icon), t('t_' + p.t)),
        h('h3', { dir: 'auto' }, p.f.n || t('unnamed')),
        h('p', { class: 'muted', dir: 'auto' }, criticalLine(data) || ' '),
        h('p', { class: 'muted small' }, new Date(p.updated).toLocaleDateString(lang === 'ar' ? 'ar' : undefined, { dateStyle: 'medium' })),
        h('div', { class: 'mine-actions' },
          h('a', { class: 'btn btn-quiet', href: `#edit/${p.id}` }, t('mine_edit')),
          h('a', { class: 'btn btn-quiet', href: `#${payload}`, target: '_blank', rel: 'noopener' }, t('mine_open')),
          h('button', { type: 'button', class: 'btn btn-quiet', onclick: () => {
            const copy = { ...structuredClone(p), id: crypto.randomUUID(), created: Date.now(), updated: Date.now() };
            copy.f.n = `${p.f.n || ''} (${t('copy_of')})`.trim();
            store.put(copy);
            showMine();
          } }, t('mine_dup')),
          del))));
  }
}

function wireMine() {
  $('#mine-export').addEventListener('click', () => {
    download(`beacon-backup-${new Date().toISOString().slice(0, 10)}.json`,
      JSON.stringify({ app: 'beacon', v: 1, profiles: store.all() }, null, 2), 'application/json');
  });
  $('#mine-import-file').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    try {
      const json = JSON.parse(await file.text());
      const profiles = (json.app === 'beacon' ? json.profiles : []).filter(isProfile);
      if (!profiles.length) throw new Error('empty');
      store.merge(profiles);
      toast(fill(t('mine_imported'), { n: profiles.length }));
      showMine();
    } catch { toast(t('mine_bad')); }
  });
}

// ---------- landing

async function heroDemo() {
  const payload = await samplePayload('m');
  const url = `${location.origin}/#${payload}`;
  $('#hero-qr').replaceChildren(qrCanvas(makeQR(url), 360, { margin: 2 }));
  const cut = url.indexOf('#');
  $('#url-demo').replaceChildren(
    h('span', { class: 'url-srv' }, url.slice(0, cut)),
    h('span', { class: 'url-dev' }, `#${payload.slice(0, 46)}…`));
}

function wireLanding() {
  for (const el of $$('[data-sample]')) {
    el.addEventListener('click', async () => { location.hash = await samplePayload(el.dataset.sample); });
  }
  for (const el of $$('[data-create]')) {
    el.addEventListener('click', () => { pendingType = el.dataset.create; location.hash = 'create'; });
  }
}

// ---------- boot

function boot() {
  applyLang();
  applyTheme(pref.get('beacon.theme', 'auto'));
  $('#lang-toggle').addEventListener('click', () => {
    lang = lang === 'ar' ? 'en' : 'ar';
    pref.set('beacon.lang', lang);
    applyLang();
    if (document.body.dataset.view === 'create') { buildForm(); generate(); }
    if (document.body.dataset.view === 'mine') showMine();
  });
  $('#theme-toggle').addEventListener('click', () => {
    const dark = document.documentElement.dataset.theme
      ? document.documentElement.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;
    const next = dark ? 'light' : 'dark';
    pref.set('beacon.theme', next);
    applyTheme(next);
  });
  wireBuilder();
  initBuilderAi();
  wireMine();
  wireLanding();
  heroDemo();
  window.addEventListener('hashchange', route);
  route();
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('/sw.js').catch(() => {});
}

boot();
