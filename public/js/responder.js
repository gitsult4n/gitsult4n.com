import { R, RESP_LANGS, RTL } from './i18n.js';
import { TYPES, EMERGENCY, guessCountry } from './data.js';
import { decryptText } from './codec.js';
import { h, icon, fill, dayNumber, telDigits, waDigits } from './util.js';

const CRITICAL = ['al', 'cd', 'md'];
const HEADLINE = ['n', 'ag', 'sp', 'nat', 'bt', 'hw'];
const VOICE = { en: 'en-US', ar: 'ar-SA', es: 'es-ES', fr: 'fr-FR', tr: 'tr-TR', ur: 'ur-PK', id: 'id-ID' };

export function pickLang() {
  for (const l of navigator.languages || [navigator.language || 'en']) {
    const k = l.slice(0, 2).toLowerCase();
    if (R[k]) return k;
  }
  return 'en';
}

function langSelect(lang, onLang) {
  return h('label', { class: 'resp-langpick' },
    h('span', { class: 'sr-only' }, (R[lang] || R.en).language),
    h('select', { onchange: (e) => onLang?.(e.target.value) },
      Object.entries(RESP_LANGS).map(([k, v]) => h('option', { value: k, selected: k === lang }, v))));
}

function shell(root, lang, preview) {
  root.replaceChildren();
  root.className = 'resp' + (preview ? ' is-preview' : '');
  root.dir = RTL.has(lang) ? 'rtl' : 'ltr';
  root.lang = lang;
}

export function renderBroken(root, { lang = pickLang(), onLang } = {}) {
  const L = R[lang] || R.en;
  shell(root, lang, false);
  root.append(
    h('div', { class: 'resp-bar' }, h('a', { class: 'resp-brand', href: '/' }, 'Beacon'), langSelect(lang, onLang)),
    h('div', { class: 'resp-broken' }, h('h1', {}, L.broken), h('a', { class: 'btn btn-primary', href: '/' }, L.make_own)),
  );
}

export function renderResponder(root, d, { lang = pickLang(), preview = false, onLang, aiSlot = null } = {}) {
  const L = R[lang] || R.en;
  const type = TYPES[d.t];
  shell(root, lang, preview);
  root.style.setProperty('--accent', type.color);
  const val = (k) => (k === 'od' || k === 'rw' ? (d[k] ? L.yes : '') : String(d[k] ?? '').trim());

  const bar = h('div', { class: 'resp-bar' },
    h('a', { class: 'resp-brand', href: '/', tabindex: preview ? -1 : null }, h('span', { class: 'beacon-dot' }), 'Beacon'),
    langSelect(lang, onLang));

  const head = h('header', { class: 'resp-head' },
    icon(type.icon, 'resp-ico'),
    h('div', {}, h('h1', {}, L['title_' + d.t]), h('p', {}, L['lead_' + d.t])));

  const sub = [d.ag && `${L.ag} ${d.ag}`, d.sp, d.nat].filter(Boolean).map(String);
  const who = h('section', { class: 'resp-who' },
    h('div', { class: 'resp-id' },
      h('div', { class: 'resp-name', dir: 'auto' }, d.n || '—'),
      sub.length ? h('div', { class: 'resp-sub', dir: 'auto' }, sub.join(' · ')) : null),
    d.bt ? h('div', { class: 'resp-blood' }, h('small', {}, L.bt), h('strong', { dir: 'ltr' }, d.bt)) : null);

  const help = val('hw') ? h('section', { class: 'resp-help' }, h('h2', {}, L.hw), h('p', { dir: 'auto' }, val('hw'))) : null;

  const crit = CRITICAL.filter((k) => type.fields.includes(k) && val(k));
  const critical = crit.length ? h('section', { class: 'resp-critical' },
    h('h2', { class: 'resp-tag' }, L.critical),
    crit.map((k) => h('div', { class: 'resp-row' + (k === 'al' ? ' is-alert' : '') },
      h('span', { class: 'resp-label' }, L[k]), h('span', { class: 'resp-val', dir: 'auto' }, val(k))))) : null;

  const contacts = (d.ct || []).filter((c) => c && c[2]);
  const ice = contacts.length ? h('section', { class: 'resp-contacts' },
    h('h2', {}, L.contacts),
    contacts.map((c) => contactCard(c, d, L))) : null;

  const rest = type.fields.filter((k) => !HEADLINE.includes(k) && !CRITICAL.includes(k) && val(k));
  const details = rest.length ? h('dl', { class: 'resp-details' },
    rest.map((k) => h('div', {}, h('dt', {}, L[k]), h('dd', { dir: 'auto' }, val(k))))) : null;

  const priv = d.pv ? privateBox(d.pv, L) : null;
  const sos = emergencyBox(L, lang);

  const age = d.u ? dayNumber() - d.u : null;
  const fresh = age == null ? null : h('p', { class: 'resp-fresh' + (age > 365 ? ' is-stale' : '') },
    fill(L.updated, { d: age <= 0 ? L.today : fill(L.days, { n: age }) }), age > 365 ? ` — ${L.stale}` : '');

  const speak = 'speechSynthesis' in window ? readAloud(root, L, lang) : null;

  root.append(bar, h('div', { class: 'resp-body' },
    head, who, aiSlot, help, critical, ice, sos, details, priv,
    h('footer', { class: 'resp-foot' },
      h('div', { class: 'resp-foot-row' }, fresh, speak),
      h('p', { class: 'resp-privacy' }, icon('lock'), L.privacy),
      h('p', { class: 'resp-disc' }, L.disclaimer),
      preview ? null : h('a', { class: 'resp-own', href: '/' }, L.make_own + ' →'))));
}

function contactCard([name, rel, phone], d, L) {
  const tel = telDigits(phone);
  const locSlot = h('div', { class: 'resp-loc' });
  const locBtn = h('button', { type: 'button', class: 'btn-loc', onclick: () => shareLocation() }, icon('pin'), L.send_loc);
  locSlot.append(locBtn);

  function links(msg) {
    const body = encodeURIComponent(msg);
    locSlot.replaceChildren(
      h('a', { class: 'btn-chip', href: `sms:${tel}?&body=${body}` }, icon('chat'), L.text),
      h('a', { class: 'btn-chip', href: `https://wa.me/${waDigits(phone)}?text=${body}`, target: '_blank', rel: 'noopener' }, L.wa));
  }

  function shareLocation() {
    const base = fill(L.found, { name: d.n || '' });
    if (!navigator.geolocation) return links(base);
    locBtn.disabled = true;
    locBtn.lastChild.textContent = L.loc_wait;
    navigator.geolocation.getCurrentPosition(
      (p) => links(`${base} ${L.at} https://maps.google.com/?q=${p.coords.latitude.toFixed(5)},${p.coords.longitude.toFixed(5)}`),
      () => { links(base); locSlot.prepend(h('small', { class: 'resp-locfail' }, L.loc_fail)); },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 });
  }

  return h('div', { class: 'resp-contact' },
    h('div', { class: 'resp-c-who' },
      h('strong', { dir: 'auto' }, name || tel),
      rel ? h('span', { dir: 'auto' }, rel) : null,
      h('span', { class: 'resp-c-num', dir: 'ltr' }, tel)),
    h('div', { class: 'resp-c-actions' },
      h('a', { class: 'btn-call', href: `tel:${tel}` }, icon('phone'), L.call),
      h('a', { class: 'btn-chip', href: `sms:${tel}` }, icon('chat'), L.text),
      h('a', { class: 'btn-chip', href: `https://wa.me/${waDigits(phone)}`, target: '_blank', rel: 'noopener' }, L.wa)),
    locSlot);
}

function emergencyBox(L, lang) {
  let names;
  try { names = new Intl.DisplayNames([lang], { type: 'region' }); } catch { names = null; }
  const label = (cc) => names?.of(cc) || cc;
  let cc = guessCountry();
  const call = h('a', { class: 'btn-sos' });
  const update = () => {
    const n = EMERGENCY[cc] || '112';
    call.href = `tel:${n}`;
    call.replaceChildren(icon('siren'), fill(L.emergency_call, { n }));
  };
  const opts = Object.keys(EMERGENCY).sort((a, b) => label(a).localeCompare(label(b), lang));
  const sel = h('select', { 'aria-label': L.country, onchange: (e) => { cc = e.target.value; update(); } },
    h('option', { value: '', selected: !cc }, '112 · 🌐'),
    opts.map((k) => h('option', { value: k, selected: k === cc }, `${label(k)} · ${EMERGENCY[k]}`)));
  update();
  return h('section', { class: 'resp-sos' }, h('h2', {}, L.emergency), h('div', { class: 'resp-sos-row' }, call, sel));
}

function privateBox(blob, L) {
  const input = h('input', { type: 'password', autocomplete: 'off', placeholder: L.pin, 'aria-label': L.pin });
  const err = h('p', { class: 'resp-err', role: 'alert' });
  const box = h('section', { class: 'resp-private' });
  const form = h('form', {
    onsubmit: async (e) => {
      e.preventDefault();
      err.textContent = '';
      try {
        const text = await decryptText(blob, input.value);
        form.replaceWith(h('p', { class: 'resp-private-text', dir: 'auto' }, text));
      } catch { err.textContent = L.wrong; input.select(); }
    },
  }, input, h('button', { class: 'btn-chip', type: 'submit' }, L.unlock));
  box.append(h('h2', {}, icon('lock'), L.private), h('p', { class: 'resp-hint' }, L.private_hint), form, err);
  return box;
}

function readAloud(root, L, lang) {
  const btn = h('button', { type: 'button', class: 'btn-chip' }, icon('sound'), h('span', {}, L.read));
  btn.addEventListener('click', () => {
    if (speechSynthesis.speaking) { speechSynthesis.cancel(); return; }
    const text = [...root.querySelectorAll('h1, .resp-head p, .resp-name, .resp-sub, .resp-blood, .resp-help, .resp-critical .resp-row, .resp-c-who')]
      .map((el) => el.innerText.replace(/\s+/g, ' ').trim()).join('. ');
    const u = new SpeechSynthesisUtterance(text);
    u.lang = VOICE[lang] || 'en-US';
    u.rate = 0.92;
    u.onend = u.onerror = () => { btn.lastChild.textContent = L.read; };
    btn.lastChild.textContent = L.stop;
    speechSynthesis.speak(u);
  });
  return btn;
}
