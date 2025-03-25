const CACHE_NAME = "schedule-cache-v1";
const URLS_TO_CACHE = [
    "index.html",
    "styles.css"
];

// Устанавливаем Service Worker и кэшируем файлы
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

// Перехватываем запросы и отдаем файлы из кэша
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
