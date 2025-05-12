
const CACHE_NAME = 'tiny-scholars-hub-cache-v1';
const urlsToCache = [
  '/',
  '/offline',
  '/manifest.json',
  // Placeholder for a generic icon that might be used in UI, if any from /public
  // '/icons/icon-72x72.png', 
  // '/icons/icon-96x96.png',
  // '/icons/icon-128x128.png',
  // '/icons/icon-144x144.png',
  // '/icons/icon-152x152.png',
  // '/icons/icon-192x192.png',
  // '/icons/icon-384x384.png',
  // '/icons/icon-512x512.png',
];

// Install event: cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache, caching core assets');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Failed to cache core assets during install:', error);
      })
  );
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event: serve from cache if available, otherwise fetch from network and cache
self.addEventListener('fetch', (event) => {
  // We only want to cache GET requests.
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          // Cache hit - return response
          return response;
        }

        // Not in cache - fetch from network
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          (response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              // For non-successful responses or opaque responses, just return them without caching.
              // Opaque responses (response.type === 'opaque') are for cross-origin requests made with 'no-cors'.
              // It's generally not safe or useful to cache them.
              return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        ).catch(() => {
          // Network request failed, and not in cache
          // If it's a navigation request, serve the offline page
          if (event.request.mode === 'navigate') {
            return caches.match('/offline');
          }
          // For other types of requests (e.g., images, API calls),
          // returning undefined will result in a standard browser error.
        });
      })
  );
});
