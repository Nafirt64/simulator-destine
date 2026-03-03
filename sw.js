const CACHE_NAME = "destine-simulator-v3w-20260303";
self.addEventListener("install", e=>self.skipWaiting());
self.addEventListener("activate", e=>self.clients.claim());
self.addEventListener("fetch", e=>{});
