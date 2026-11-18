// Haushaltsbuch service worker: keeps the app available offline.
// Serves from the cache first and refreshes the cache in the background,
// so a new upload is picked up on the next start.
// Responses are stored without redirect information: some hosts redirect /index.html to /,
// and Chrome refuses a redirected response for a page load.
// Only caches starting with "haushaltsbuch-" are touched: other apps on the same address keep their own.
const CACHE = 'haushaltsbuch-v16';
const ASSETS = [
  './',
  './manifest.webmanifest',
  './fonts/bricolage-grotesque.woff2',
  './fonts/figtree.woff2',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
];

async function clean(res) {
  if (!res || !res.redirected) return res;
  return new Response(await res.blob(), { status: res.status, statusText: res.statusText, headers: res.headers });
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    for (const url of ASSETS) {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error('Precache failed: ' + url);
      await cache.put(url, await clean(res));
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('haushaltsbuch-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  const key = req.mode === 'navigate' ? './' : req;
  event.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(key, { ignoreSearch: true });
    const network = fetch(req).then(async res => {
      if (res && res.ok) { const c = await clean(res); await cache.put(key, c.clone()); return c; }
      return res;
    }).catch(() => null);
    if (cached) { event.waitUntil(network); return clean(cached); }
    return (await network) || new Response('Offline und noch nicht im Speicher.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }));
});
