const cacheName = 'cache-v4';
const resourcesToPrecache = [
    '/',
    '/index.html',
    'css/style.css',
    'img/icon.png',
    'img/icon-2.png'
]

self.addEventListener('install', event=>{
    console.log("Install event");
    event.waitUntil(
        caches.open(cacheName).
        then((cache)=>{
            return cache.addAll(resourcesToPrecache);
        })
    )
})



self.addEventListener("activate", event=>{
    console.log("Activate event");
})

self.addEventListener("fetch", event=>{
    console.log("Fetch intercepted for:", event.request.url);

    event.respondWith(
        caches.open(cacheName).then(cache=>{
            return cache.match(event.request).then(response=>{
                const fetchPromise = fetch(event.request)
                .then(networkResponse => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                })
                return response || fetchPromise;
            })
        })
    )
})

