/* =============================================
   GeoQuest — Service Worker
   Caches the app shell on first load so the
   app works completely offline after that.

   UPDATE: Change BASE to match your GitHub repo name.
   Example: repo is 'geoquest' → BASE = '/geoquest/'
   User page (username.github.io) → BASE = '/'
============================================= */

var CACHE = 'geoquest-v5';
var BASE  = '/geoquest/';

var ASSETS = [
  BASE,
  BASE + 'index.html',
  BASE + 'manifest.json',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;800;900&display=swap',
  'https://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDLshdTQ3j6zbXWjgevT5.woff2'
];

/* Install: cache everything */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(ASSETS).catch(function(err) {
        console.warn('GeoQuest SW: cache addAll partial fail', err);
      });
    })
  );
  self.skipWaiting();
});

/* Activate: delete old caches */
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys
          .filter(function(k) { return k !== CACHE; })
          .map(function(k)    { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

/* Fetch: cache-first strategy */
self.addEventListener('fetch', function(e) {
  /* Only handle GET requests */
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if (cached) return cached;

      return fetch(e.request).then(function(res) {
        /* Only cache valid, non-opaque responses */
        if (!res || res.status !== 200 || res.type === 'opaque') return res;

        var clone = res.clone();
        caches.open(CACHE).then(function(cache) {
          cache.put(e.request, clone);
        });
        return res;
      }).catch(function() {
        /* Offline fallback: return the app shell */
        return caches.match(BASE + 'index.html');
      });
    })
  );
});
