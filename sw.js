// Service worker do app: guarda a página para abrir mesmo sem internet.
// Sempre tenta a rede primeiro, então quem está online recebe a versão nova na hora.
// Os dados do TSE e do Firebase não passam por aqui (outros domínios).
const CACHE = 'apuracao-v2';
const ARQUIVOS = ['./', './index.html', './mapa-br.js', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ARQUIVOS)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys()
    .then(ks=>Promise.all(ks.filter(k=>k !== CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim()));
});

self.addEventListener('fetch', e=>{
  const req = e.request;
  if(req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req).then(res=>{
      if(res.ok){ const copia = res.clone(); caches.open(CACHE).then(c=>c.put(req, copia)); }
      return res;
    }).catch(()=>caches.match(req, {ignoreSearch:true}).then(r=>r || caches.match('./index.html')))
  );
});
