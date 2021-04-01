self.__prechacheManifest = [].concat(self.__prechacheManifest || []);

workbox.setConfig({
    debug: true
})

workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    }),
  );

workbox.routing.registerRoute(
    new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
    new workbox.strategies.CacheFirst({
        cacheName: "googleapis",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 30
            })
        ],
        method: "GET",
    })
);

workbox.routing.registerRoute(
    new RegExp("https://maps.(?:googleapis|gstatic).com/(.*)"),
    new workbox.strategies.NetworkFirst({
        cacheName: "maps",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 10
            })
        ],
        method: "GET",
    })
);

workbox.routing.registerRoute(
    new RegExp("http://127.0.0.1:8000/image/(.*)"),
    new workbox.strategies.NetworkFirst({
        cacheName: "pictures",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 10
            })
        ],
        method: "GET",
    })
);

workbox.routing.registerRoute(
    new RegExp('http://localhost:8000/(.*)'),
    new workbox.strategies.NetworkFirst({
        cacheName: 'api',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 24 * 60 * 60,
            }),
        ],
        method: "GET"
    }),
);

// Background Sync
const bgSyncPlugin = new workbox.backgroundSync.Plugin('myQueue', {
    maxRetentionTime: 24 * 60, // Retry for max of 24 Hours
});
const networkWithBackgroundSync = new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin],
});
workbox.routing.registerRoute(/\/*/, networkWithBackgroundSync, "POST");
workbox.routing.registerRoute(/\/*/, networkWithBackgroundSync, "PUT");
workbox.routing.registerRoute(/\/*/, networkWithBackgroundSync, "DELETE");