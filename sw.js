// O site antigo instalava um service worker de cache. Este substituto apaga os caches dele e se desregistra,
// para que quem já visitou receba a versão nova direto da rede.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const nome of await caches.keys()) await caches.delete(nome);
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate(c.url);
})()));
