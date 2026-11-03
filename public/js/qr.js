/* global qrcode */

// Split into two segments: the URL prefix as bytes, the base43 fragment as alphanumeric.
export function makeQR(url, ec = 'M') {
  const cut = url.indexOf('#') + 1;
  const qr = qrcode(0, ec);
  qr.addData(url.slice(0, cut), 'Byte');
  qr.addData(url.slice(cut), 'Alphanumeric');
  qr.make();
  return qr;
}

export const qrVersion = (qr) => (qr.getModuleCount() - 17) / 4;

// Integer module size keeps edges crisp; the code is centered in the box.
export function drawQR(ctx, qr, x, y, size, dark = '#0b0d12') {
  const n = qr.getModuleCount();
  const cell = Math.max(1, Math.floor(size / n));
  const off = Math.floor((size - cell * n) / 2);
  ctx.fillStyle = dark;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (qr.isDark(r, c)) ctx.fillRect(x + off + c * cell, y + off + r * cell, cell, cell);
    }
  }
}

export function qrCanvas(qr, size, { margin = 4, dark = '#0b0d12', light = '#ffffff' } = {}) {
  const n = qr.getModuleCount() + margin * 2;
  const cell = Math.max(1, Math.floor(size / n));
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = cell * n;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = light;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawQR(ctx, qr, cell * margin, cell * margin, cell * (n - margin * 2), dark);
  return canvas;
}

export function qrSvg(qr, { margin = 4, dark = '#0b0d12', light = '#ffffff' } = {}) {
  const n = qr.getModuleCount();
  const size = n + margin * 2;
  let d = '';
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (qr.isDark(r, c)) d += `M${c + margin} ${r + margin}h1v1h-1z`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges">`
    + `<rect width="${size}" height="${size}" fill="${light}"/><path d="${d}" fill="${dark}"/></svg>`;
}
