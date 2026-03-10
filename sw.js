/* ==============================================
   GeoQuest — Service Worker
   Cache-first strategy. Offline after first load.
   Update CACHE_NAME version when deploying changes
   that need to bust the cache.
============================================== */

var CACHE_NAME = 'geoquest-v1';
var BASE       = '/geoquest/';

var PRECACHE = [
  BASE,
  BASE + 'index.html',
  BASE + 'manifest.json',
  BASE + 'icon.png',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;800;900&display=swap'
];

/* Install — pre-cache core files */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(PRECACHE);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

/* Activate — delete old caches */
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k)   { return caches.delete(k); })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

/* Fetch — serve from cache, fall back to network */
self.addEventListener('fetch', function(e) {
  /* Only handle GET requests */
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if (cached) return cached;

      return fetch(e.request).then(function(response) {
        /* Cache valid responses for next time */
        if (response && response.status === 200 && response.type !== 'opaque') {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(e.request, clone);
          });
        }
        return response;
      }).catch(function() {
        /* Network failed and nothing in cache — nothing we can do */
        return new Response('Offline', { status: 503 });
      });
    })
  );
});
