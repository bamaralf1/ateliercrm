const CACHE = 'atelier-crm-v6';
const VERSION = 'v6';
const OFFLINE_URL = './offline.html';

const STATIC_ASSETS = [
  './',
  './index.html',
  './assets/atelier-crm.js',
  './assets/style.css',
  './assets/manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-192.png',
  './icon-maskable-512.png',
  './offline.html',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(STATIC_ASSETS))
      .catch((err) => console.error('[SW] install failed', err))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
  if (event.data?.type === 'CLEAR_CACHE') {
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))).then(() => self.skipWaiting());
  }
});

// Estratégia:
// - Navegação: network-first, fallback cache → página offline
// - Assets do app (JS/CSS): network-first (garante atualizações), fallback cache
// - Imagens/fontes (locais e CDN): cache-first, atualiza em background
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  // Navegação: network-first com fallback cache → offline
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((ca) => ca.put(e.request, copy));
          return res;
        })
        .catch(() =>
          caches.match(e.request)
            .then((r) => r || caches.match(OFFLINE_URL))
            .then((r) => r || new Response('Offline', { status: 503, statusText: 'Offline' }))
        )
    );
    return;
  }

  // Ícones/fontes/imagens (cache-first com atualização em background)
  if (url.pathname.match(/\.(png|jpg|jpeg|gif|svg|woff2?|ttf|eot|ico)$/i)) {
    e.respondWith(
      caches.match(e.request).then((cached) => {
        const network = fetch(e.request)
          .then((res) => {
            if (res && res.ok) {
              const copy = res.clone();
              caches.open(CACHE).then((ca) => ca.put(e.request, copy));
            }
            return res;
          })
          .catch(() => cached);
        return cached || network;
      })
    );
    return;
  }

  // Demais assets (JS/CSS): network-first com fallback cache
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((ca) => ca.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
