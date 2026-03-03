const CACHE_NAME = "destine-simulator-v3-20260303";
const ASSETS = [
  "./",
  "./index.html?v=20260303103952",
  "./manifest.webmanifest?v=20260303103952",
  "./icon-192.png?v=20260303103952",
  "./icon-512.png?v=20260303103952",
  "./icon-192-maskable.png?v=20260303103952",
  "./icon-512-maskable.png?v=20260303103952",
  "./apple-touch-icon.png?v=20260303103952"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k.startsWith("destine-simulator-") && k !== CACHE_NAME) ? caches.delete(k) : Promise.resolve()))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put("./index.html?v=20260303103952", copy));
        return res;
      }).catch(() => caches.match("./index.html?v=20260303103952") || caches.match("./"))
    );
    return;
  }
  event.respondWith(caches.match(req).then((cached) => cached || fetch(req)));
});
