const CACHE = 'atelier-crm-v2';
const ASSETS = ['/', '/index.html', '/js/atelier-crm.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((ks) =>
      Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request).then((res) => {
      const c = res.clone();
      if (res.ok && res.url.startsWith(self.location.origin)) {
        caches.open(CACHE).then((ca) => ca.put(e.request, c));
      }
      return res;
    }).catch(() => caches.match('/index.html')))
  );
});
