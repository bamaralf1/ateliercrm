const CACHE = 'atelier-crm-v5';
const ASSETS = ['./', './index.html', './js/atelier-crm.bundle.js', './translations.js', './manifest.json'];

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

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  const serveFromNetwork = () =>
    fetch(e.request)
      .then((res) => {
        if (res.ok) {
          const c = res.clone();
          caches.open(CACHE).then((ca) => ca.put(e.request, c));
        }
        return res;
      })
      .catch(() =>
        caches.match(e.request).then((r) => r || (e.request.mode === 'navigate' ? caches.match('./index.html') : undefined))
      );

  e.respondWith(
    caches.match(e.request).then((r) => {
      if (r && e.request.mode === 'navigate') {
        return fetch(e.request).then((fresh) => {
          const c = fresh.clone();
          caches.open(CACHE).then((ca) => ca.put(e.request, c));
          return fresh;
        }).catch(() => r);
      }
      if (r && url.pathname === '/js/atelier-crm.bundle.js') {
        return fetch(e.request).then((fresh) => {
          const c = fresh.clone();
          caches.open(CACHE).then((ca) => ca.put(e.request, c));
          return fresh;
        }).catch(() => r);
      }
      return r || serveFromNetwork();
    })
  );
});
