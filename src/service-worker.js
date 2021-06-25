self.__prechacheManifest = [].concat(self.__prechacheManifest || []);

workbox.setConfig({
    debug: true
})

workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://fonts.googleapis.com',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 100,
        }),
      ],
    })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://fonts.gstatic.com',
    new workbox.strategies.CacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
);

workbox.routing.registerRoute(
    new RegExp("https://maps.(?:googleapis|gstatic).com/(.*)"),
    new workbox.strategies.NetworkFirst({
        cacheName: "google-maps",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60
            })
        ]
    })
);

workbox.routing.registerRoute(
    new RegExp("https://schuldenmanager-backend.herokuapp.com/image/(.*)"),
    new workbox.strategies.NetworkFirst({
        cacheName: "pictures",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60
            })
        ],
        method: "GET",
    })
);

workbox.routing.registerRoute(
    new RegExp('https://schuldenmanager-backend.herokuapp.com/(.*)'),
    new workbox.strategies.NetworkFirst({
        cacheName: 'api',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 7 * 24 * 60 * 60,
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

// Push Notifications

let click_open_url
self.addEventListener('push', event => {
    let push_message = event.data.text();

    click_open_url = "/";
    const options = {
        body: push_message,
        tag: 'alert-sample-Julian'
    };
    event.waitUntil(self.registration.showNotification("Still Waitin", options));
});

self.addEventListener('notificationclick', event => {
    const clickedNotification = event.notification;
    clickedNotification.close();
    if(click_open_url) {
        const promiseChain = clients.openWindow(click_open_url);
        event.waitUntil(promiseChain);
    }
});