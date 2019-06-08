var versao = 10;
var arquivos = [
  "./css/style.css",
  "./js/main.js",
  "./imgs/1.jpg",
  "./imgs/2.jpg",
  "./imgs/3.jpg",
  "./imgs/4.jpg",
  "./imgs/5.jpg",
  "./imgs/6.jpg",
  "./imgs/7.jpeg",
  "./imgs/8.jpg",
  "./offline/index.html"
];

// Intalação do service worker
self.addEventListener("install", function() {
  this.skipWaiting();
  console.log("Instalou service worker!");
});

// Ativação e callback que irá excluir as versões anteriores do service worker
self.addEventListener("activate", function() {
  caches.open("minicurso-pwa-" + versao).then(cache => {
    cache.addAll(arquivos).then(function() {
      caches.delete("minicurso-pwa-" + (versao - 1));
      caches.delete("minicurso-pwa");
    });
  });
});

// Tratamento das requisições que o site fizer passarão aqui
// Estratégia "Cache First"
self.addEventListener("fetch", function(event) {
  let pedido = event.request;

  event.respondWith(
    caches
      .match(pedido)
      .then(respostaCache => {
        let resposta = respostaCache ? respostaCache : fetch(pedido);
        return resposta;
      })
      .catch(() => {
        // Se der algum problema com a requisição, essa página aparecerá
        return caches.match("./offline/index.html");
      })
  );
});
