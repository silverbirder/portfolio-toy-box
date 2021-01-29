importScripts('https://cdn.ampproject.org/sw/amp-sw.js');

AMP_SW.init({
    assetCachingOptions: [{
        regexp: /\.(png|jpg|woff2|woff|css|js)/,
        cachingStrategy: 'CACHE_FIRST',
    }],
    linkPrefetchOptions: {
        maxAgeSecondsInCache: 5
    }
});

//@see: https://googlechrome.github.io/samples/service-worker/basic/
const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

const PRECACHE_URLS = [
    'index.html',
    './', // Alias for index.html
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
    console.log('install');
    event.waitUntil(
        caches.open(PRECACHE)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(self.skipWaiting())
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', async event => {
    console.log('activate');
    // function urlBase64ToUint8Array(base64String) {
    //     const padding = '='.repeat((4 - base64String.length % 4) % 4);
    //     const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    //     const rawData = self.atob(base64);
    //     const outputArray = new Uint8Array(rawData.length);
    //     for (let i = 0; i < rawData.length; ++i) {
    //         outputArray[i] = rawData.charCodeAt(i);
    //     }
    //     return outputArray;
    // }
    // const convertedVapidKey = urlBase64ToUint8Array("BAWrcjWdlscQOdRFf0qV3OG4_CXU0xk_qKDPVZG3pMLkRfiNBhPsGRq1jZDpwI_ualZs9cTzaNHmqicmZ8ZVkO8");
    //
    // // (変換した)パブリックキーをapplicationServerKeyに設定してsubscribe
    // const subscription = await self.registration.pushManager.subscribe({
    //     userVisibleOnly: true,
    //     applicationServerKey: convertedVapidKey
    // });
    // console.log(subscription);
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())
    );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', async event => {
    console.log('fetch');
    // Skip cross-origin requests, like those for Google Analytics.
    if (event.request.url.startsWith(self.location.origin) ||
        /(algolia|shields)/.test(event.request.url) ||
        /(png|jpg)$/.test(event.request.url)
    ) {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    console.log(`hit cache. ${event.request.url}`);
                    return cachedResponse;
                }

                return caches.open(RUNTIME).then(cache => {
                    return fetch(event.request).then(response => {
                        // Put a copy of the response in the runtime cache.
                        return cache.put(event.request, response.clone()).then(() => {
                            console.log(`put cache. ${event.request.url}`);
                            return response;
                        });
                    });
                });
            })
        );
    }
});
