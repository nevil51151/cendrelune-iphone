/* Garde le jeu sur le téléphone : avec internet, la dernière version ; sans internet, celle déjà enregistrée. */
const CACHE='cendrelune-1',BASE=['./','index.html','manifest.webmanifest','apple-touch-icon.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(BASE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(l=>Promise.all(l.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  e.respondWith(fetch(r).then(x=>{if(x&&(x.ok||x.type==='opaque')){const c=x.clone();caches.open(CACHE).then(k=>k.put(r,c));}return x;}).catch(()=>caches.match(r).then(x=>x||(r.mode==='navigate'?caches.match('index.html'):Response.error()))));
});
