// Network first, cache as fallback: always fresh online, still opens a Beacon offline
// once the app has been loaded on this device.
const CACHE = 'beacon-v1';
const SHELL = [
  '/', '/app.css', '/vendor/qrcode.js', '/fonts/space-grotesk.woff2', '/icon.svg', '/manifest.webmanifest',
  '/js/app.js', '/js/ai.js', '/js/codec.js', '/js/data.js', '/js/i18n.js', '/js/outputs.js', '/js/qr.js',
  '/js/responder.js', '/js/store.js', '/js/util.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin || url.pathname.startsWith('/api/')) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
        return res;
      })
      .catch(() => caches.match(e.request).then((hit) => hit || (e.request.mode === 'navigate' ? caches.match('/') : Response.error()))),
  );
});
