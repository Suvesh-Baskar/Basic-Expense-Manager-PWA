const cacheName = 'v1';

const cacheAssets = ['index.html'];

self.addEventListener('install', event => {
  console.log('Service Worker: Installed');

  //   event.waitUntil(
  //     caches
  //       .open(cacheName)
  //       .then(cache => {
  //         cache.addAll(cacheAssets);
  //         console.log('Service Worker: Caching Files');
  //       })
  //       .then(() => self.skipWaiting())
  //       .catch(err => console.log(`Service Worker: Error`, err))
  //   );
});

self.addEventListener('activate', event => {
  console.log('Service Worker: Activated');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  console.log('Service Worker: Fetching Files', event);
  event.respondWith(
    fetch(event.request)
      .then(res => {
        const resClone = res.clone();
        caches.open(cacheName).then(cache => {
          cache.put(event.request, resClone);
        });
        return res;
      })
      .catch(() => caches.match(event.request).then(res => res))
  );
});
