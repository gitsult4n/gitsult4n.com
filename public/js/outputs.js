import { UI } from './i18n.js';
import { TYPES } from './data.js';
import { drawQR, qrCanvas, qrSvg } from './qr.js';
import { h, download, slug, telDigits } from './util.js';

export const DEVICES = {
  iphone: { label: 'iPhone 6.1″', w: 1179, h: 2556 },
  iphonemax: { label: 'iPhone 6.7″', w: 1290, h: 2796 },
  iphonese: { label: 'iPhone SE', w: 750, h: 1334 },
  android: { label: 'Android 20:9', w: 1080, h: 2400 },
  androidhd: { label: 'Android QHD', w: 1440, h: 3200 },
};

const STYLES = {
  signal: { bg: ['#ff5a36', '#b3121f'], fg: '#ffffff', sub: 'rgba(255,255,255,.82)' },
  night: { bg: ['#1b1f2b', '#07080c'], fg: '#ffffff', sub: 'rgba(255,255,255,.7)' },
  paper: { bg: ['#fbf8f2', '#efe8db'], fg: '#14161c', sub: 'rgba(20,22,28,.66)' },
};

const FONT = '"Space Grotesk", system-ui, -apple-system, "SF Arabic", "Segoe UI", Tahoma, sans-serif';

// The one line a stranger needs most, printed in plain text next to every code.
export function criticalLine(d) {
  const parts = [];
  if (d.bt) parts.push(`Blood ${d.bt}`);
  if (d.al) parts.push(`Allergy: ${d.al}`);
  if (d.cd) parts.push(d.cd);
  if (!parts.length && d.hw) parts.push(d.hw);
  return parts.join(' · ');
}

function wrap(ctx, text, maxW, maxLines) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = w; } else line = test;
    if (lines.length === maxLines) break;
  }
  if (lines.length < maxLines && line) lines.push(line);
  if (lines.length === maxLines && words.join(' ').length > lines.join(' ').length) {
    let last = lines[maxLines - 1];
    while (ctx.measureText(last + '…').width > maxW && last.length) last = last.slice(0, -1);
    lines[maxLines - 1] = last + '…';
  }
  return lines;
}

function roundRect(ctx, x, y, w, hgt, r) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, hgt, r);
  ctx.fill();
}

export async function wallpaper(d, qr, deviceKey, styleKey) {
  await document.fonts.ready;
  const { w: W, h: H } = DEVICES[deviceKey];
  const st = STYLES[styleKey];
  const s = W / 1179;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, W * 0.4, H);
  g.addColorStop(0, st.bg[0]); g.addColorStop(1, st.bg[1]);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // soft beacon rings behind the code
  const cy = H * 0.6;
  ctx.strokeStyle = styleKey === 'paper' ? 'rgba(229,55,42,.10)' : 'rgba(255,255,255,.08)';
  for (let i = 1; i <= 4; i++) {
    ctx.lineWidth = 3 * s;
    ctx.beginPath(); ctx.arc(W / 2, cy, W * 0.24 * i, 0, Math.PI * 2); ctx.stroke();
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  let y = H * 0.355;

  const pill = `${UI.en.w_scan}  ·  ${UI.ar.w_scan}`;
  ctx.font = `700 ${34 * s}px ${FONT}`;
  const pw = ctx.measureText(pill).width + 64 * s;
  ctx.fillStyle = styleKey === 'paper' ? TYPES[d.t].color : 'rgba(255,255,255,.16)';
  roundRect(ctx, (W - pw) / 2, y, pw, 64 * s, 32 * s);
  ctx.fillStyle = '#fff';
  ctx.fillText(pill, W / 2, y + 15 * s);
  y += 100 * s;

  ctx.fillStyle = st.fg;
  ctx.font = `700 ${64 * s}px ${FONT}`;
  for (const line of wrap(ctx, d.n || '', W * 0.84, 1)) { ctx.fillText(line, W / 2, y); y += 78 * s; }

  const crit = criticalLine(d);
  if (crit) {
    ctx.fillStyle = st.sub;
    ctx.font = `500 ${36 * s}px ${FONT}`;
    for (const line of wrap(ctx, crit, W * 0.8, 2)) { ctx.fillText(line, W / 2, y); y += 46 * s; }
  }
  y += 28 * s;

  const box = Math.min(W * 0.46, H * 0.25);
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 40 * s; ctx.shadowOffsetY = 12 * s;
  roundRect(ctx, (W - box) / 2, y, box, box, 36 * s);
  ctx.shadowColor = 'transparent';
  const pad = box * 0.08;
  drawQR(ctx, qr, (W - box) / 2 + pad, y + pad, box - pad * 2);
  y += box + 36 * s;

  const ct = (d.ct || []).find((x) => x && x[2]);
  if (ct) {
    ctx.fillStyle = st.sub;
    ctx.font = `500 ${32 * s}px ${FONT}`;
    ctx.fillText(`${UI.en.w_ice} · ${UI.ar.w_ice}`, W / 2, y);
    y += 44 * s;
    ctx.fillStyle = st.fg;
    ctx.font = `700 ${44 * s}px ${FONT}`;
    const who = [ct[0], ct[1] && `(${ct[1]})`].filter(Boolean).join(' ');
    ctx.fillText(wrap(ctx, `${who}  ${telDigits(ct[2])}`, W * 0.86, 1)[0], W / 2, y);
  }

  const blob = await new Promise((r) => c.toBlob(r, 'image/png'));
  download(`beacon-wallpaper-${slug(d.n)}.png`, blob);
}

export function downloadPng(d, qr) {
  qrCanvas(qr, 1200).toBlob((b) => download(`beacon-${slug(d.n)}.png`, b));
}

export function downloadSvg(d, qr) {
  download(`beacon-${slug(d.n)}.svg`, qrSvg(qr), 'image/svg+xml');
}

export function downloadIcs(d, url) {
  const day = new Date(Date.now() + 182 * 864e5);
  const ymd = (dt) => dt.toISOString().slice(0, 10).replace(/-/g, '');
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const esc = (s) => String(s).replace(/[\\;,]/g, (m) => '\\' + m).replace(/\n/g, '\\n');
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//gitsult4n//Beacon//EN', 'BEGIN:VEVENT',
    `UID:${crypto.randomUUID()}@gitsult4n.com`, `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${ymd(day)}`, `DTEND;VALUE=DATE:${ymd(new Date(day.getTime() + 864e5))}`,
    `SUMMARY:${esc(`Review Beacon: ${d.n || 'emergency info'}`)}`,
    `DESCRIPTION:${esc(`Are the medications, allergies and phone numbers still correct? Edit: ${url.split('#')[0]}#mine`)}`,
    'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:Review your Beacon', 'TRIGGER:PT9H', 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  download(`beacon-review-${slug(d.n)}.ics`, ics, 'text/calendar');
}

// ---- print layouts (rendered into #print-root, everything else hidden by @media print)

function svgEl(qr) {
  return h('div', { class: 'p-qr', html: qrSvg(qr, { margin: 2 }) });
}

function contactLines(d, max = 3) {
  return (d.ct || []).filter((c) => c && c[2]).slice(0, max)
    .map(([n, r, p]) => h('div', { class: 'p-ct' }, h('b', { dir: 'auto' }, n || ''), r ? h('span', { dir: 'auto' }, ` ${r}`) : null, h('span', { class: 'p-num', dir: 'ltr' }, telDigits(p))));
}

function printWith(kind, nodes) {
  const root = document.getElementById('print-root');
  root.className = `print-${kind}`;
  root.replaceChildren(...nodes);
  document.body.classList.add('printing');
  const done = () => { document.body.classList.remove('printing'); root.replaceChildren(); window.removeEventListener('afterprint', done); };
  window.addEventListener('afterprint', done);
  requestAnimationFrame(() => window.print());
}

export function printCard(d, qr) {
  const color = TYPES[d.t].color;
  const front = h('div', { class: 'p-card', style: `--accent:${color}` },
    h('div', { class: 'p-band' }, 'IN CASE OF EMERGENCY · في حالة الطوارئ'),
    h('div', { class: 'p-card-body' },
      h('div', { class: 'p-card-text' },
        h('div', { class: 'p-name', dir: 'auto' }, d.n || ''),
        d.bt ? h('div', { class: 'p-blood' }, 'Blood ', h('b', {}, d.bt)) : null,
        d.al ? h('div', { class: 'p-alert', dir: 'auto' }, '⚠ ', d.al) : null,
        d.cd ? h('div', { class: 'p-line', dir: 'auto' }, d.cd) : null,
        d.md ? h('div', { class: 'p-line', dir: 'auto' }, d.md) : null),
      svgEl(qr)));
  const back = h('div', { class: 'p-card', style: `--accent:${color}` },
    h('div', { class: 'p-band' }, 'EMERGENCY CONTACTS · جهات الاتصال'),
    h('div', { class: 'p-card-back' },
      contactLines(d),
      h('p', { class: 'p-foot' }, 'Scan the code for full info in 7 languages · امسح الرمز للمزيد'),
      h('p', { class: 'p-foot' }, `gitsult4n.com · ${new Date().toISOString().slice(0, 10)}`)));
  printWith('card', [h('div', { class: 'p-pair' }, front, back), h('p', { class: 'p-hint' }, 'Cut along the edges, fold in the middle, laminate.')]);
}

export function printBands(d, qr) {
  const ct = (d.ct || []).find((c) => c && c[2]);
  const band = () => h('div', { class: 'p-wrist', style: `--accent:${TYPES[d.t].color}` },
    svgEl(qr),
    h('div', { class: 'p-wrist-text' },
      h('div', { class: 'p-wrist-top' }, 'IF I AM LOST, PLEASE CALL · إذا ضعت اتصل'),
      ct ? h('div', { class: 'p-wrist-num', dir: 'ltr' }, telDigits(ct[2])) : null,
      h('div', { class: 'p-wrist-name', dir: 'auto' }, [d.n, ct && ct[1] && `— ${ct[0] || ''} (${ct[1]})`].filter(Boolean).join(' '))),
    h('div', { class: 'p-wrist-scan' }, 'SCAN'));
  printWith('bands', [band(), band(), band(), h('p', { class: 'p-hint' }, 'Cut each strip. Wrap snugly and tape, or slide into a waterproof wristband sleeve.')]);
}

export function printStickers(d, qr) {
  const ct = (d.ct || []).find((c) => c && c[2]);
  const sticker = () => h('div', { class: 'p-sticker', style: `--accent:${TYPES[d.t].color}` },
    h('div', { class: 'p-st-top' }, 'SCAN ME · امسحني'), svgEl(qr),
    ct ? h('div', { class: 'p-st-num', dir: 'ltr' }, telDigits(ct[2])) : null);
  printWith('stickers', [h('div', { class: 'p-sheet' }, Array.from({ length: 12 }, sticker)), h('p', { class: 'p-hint' }, 'Print on sticker paper, or cut and seal with clear tape.')]);
}
