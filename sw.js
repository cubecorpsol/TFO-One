const CACHE_NAME = 'tfo-one-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

const isLocalhost = self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1';

if (isLocalhost) {
  // Self-destruct service worker on localhost to prevent development caching loops
  self.addEventListener('install', (e) => {
    self.skipWaiting();
  });

  self.addEventListener('activate', (e) => {
    self.registration.unregister().then(() => {
      console.log('Local Service Worker self-unregistered successfully.');
      return self.clients.matchAll();
    }).then((clients) => {
      clients.forEach((client) => {
        if (client.url) {
          client.navigate(client.url);
        }
      });
    });
  });
} else {
  // Production service worker caching
  self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting();
  });

  self.addEventListener('activate', (e) => {
    e.waitUntil(
      caches.keys().then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
    );
    self.clients.claim();
  });

  self.addEventListener('fetch', (e) => {
    if (!e.request.url.startsWith('http://') && !e.request.url.startsWith('https://')) {
      return;
    }

    const url = new URL(e.request.url);
    const isNavigation = e.request.mode === 'navigate' || 
                         url.pathname === '/' || 
                         url.pathname === '/index.html' || 
                         url.pathname === '/manifest.json';

    if (isNavigation) {
      // Network-First strategy: Always fetch latest index/manifest, fall back to cache if offline
      e.respondWith(
        fetch(e.request)
          .then((res) => {
            if (res.status === 200 && e.request.method === 'GET') {
              const clone = res.clone();
              caches.open(CACHE_NAME).then((c) => c.put(e.request, clone));
            }
            return res;
          })
          .catch(() => {
            return caches.match(e.request).then((cached) => {
              if (cached) return cached;
              return caches.match('/index.html');
            });
          })
      );
    } else {
      // Cache-First strategy for static assets (JS, CSS, images, etc.)
      e.respondWith(
        caches.match(e.request).then((cached) => {
          if (cached) return cached;
          return fetch(e.request)
            .then((res) => {
              if (res.status === 200 && e.request.method === 'GET') {
                const clone = res.clone();
                caches.open(CACHE_NAME).then((c) => c.put(e.request, clone));
              }
              return res;
            });
        })
      );
    }
  });
}
