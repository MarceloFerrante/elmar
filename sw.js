// Offline para a exposição: depois da primeira visita, o site abre sem rede.
// Rede primeiro (sempre a versão nova); se a rede demora ou falha, o cache.
// ferramentas/publicar.py troca VERSAO a cada publicação e gera arquivos.json,
// a lista do que baixar em segundo plano na instalação.
const VERSAO = '7246ef5-20261020120130';
const CACHE = 'elmar-' + VERSAO;
const ESPERA_MS = 4000;

self.addEventListener('install', e => e.waitUntil((async () => {
  const cache = await caches.open(CACHE);
  try {
    const lista = await (await fetch('arquivos.json', { cache: 'no-store' })).json();
    await cache.addAll(lista);
  } catch (err) { /* sem lista (servidor local): cacheia só o que for aberto */ }
  await self.skipWaiting();
})()));

self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const nome of await caches.keys()) if (nome !== CACHE) await caches.delete(nome);
  await self.clients.claim();
})()));

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  // A página inteira é index.html (navegação por hash): uma chave só para ela.
  const chave = e.request.mode === 'navigate' ? new URL('./', location).href : e.request;
  const daRede = fetch(e.request);
  // Guarda a resposta nova mesmo quando o cache já respondeu antes.
  e.waitUntil(daRede.then(async r => {
    if (r.ok) await (await caches.open(CACHE)).put(chave, r.clone());
  }).catch(() => {}));
  e.respondWith(servir(chave, daRede));
});

async function servir(chave, daRede) {
  const guardado = await caches.match(chave, { ignoreSearch: true });
  if (!guardado) return daRede;
  const espera = new Promise(ok => setTimeout(() => ok(guardado), ESPERA_MS));
  return Promise.race([daRede.then(r => (r.ok ? r : guardado), () => guardado), espera]);
}
