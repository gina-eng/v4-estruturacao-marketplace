/*
 * Zenvet LP — atribuição de origem para o CRM Kommo.
 *
 * O WhatsApp da clínica já está conectado à Kommo, então toda mensagem vira
 * lead automaticamente. Este script resolve a CAMADA DE ATRIBUIÇÃO:
 *
 *  1. Captura UTMs da URL (first-touch, persistido em localStorage).
 *  2. Quando há UTM, injeta um código curto no texto pré-preenchido dos
 *     botões wa.me — ex.: "(cód: g/felino-maio)". Visitante orgânico/direto
 *     continua vendo o texto limpo (preserva o tom da marca).
 *  3. Dispara o evento `whatsapp_click` no dataLayer (GTM → GA4 / Google Ads).
 *
 * Na Kommo, um Salesbot lê a 1ª mensagem:
 *   - contém "Vi a página da Zenvet"  -> Fonte = Landing Page
 *   - contém "(cód: ...)"             -> parseia origem/campanha
 *
 * Observação: o texto pré-preenchido pode ser editado pelo usuário antes de
 * enviar, então a atribuição por campanha é best-effort (~80-90%).
 */
(function () {
  var UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  var KEY = "zv_attrib";

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; }
  }
  function save(o) {
    try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {}
  }

  var params = new URLSearchParams(window.location.search);
  var fresh = {};
  UTM.forEach(function (k) { var v = params.get(k); if (v) fresh[k] = v; });

  var stored = read();
  // first-touch vence: só grava se ainda não houver origem salva
  if (Object.keys(fresh).length && !stored.utm_source) { save(fresh); stored = fresh; }
  var attrib = Object.keys(fresh).length ? fresh : stored;

  var srcMap = { google: "g", facebook: "m", meta: "m", instagram: "ig", bing: "b" };
  var src = attrib.utm_source
    ? (srcMap[attrib.utm_source.toLowerCase()] || attrib.utm_source.toLowerCase())
    : "";
  var cmp = attrib.utm_campaign || "";
  var code = [src, cmp].filter(Boolean).join("/");

  var SELECTOR = 'a[href*="wa.me"], a[href*="api.whatsapp.com"]';

  function decorate() {
    if (!code) return;
    var anchors = document.querySelectorAll(SELECTOR);
    Array.prototype.forEach.call(anchors, function (a) {
      if (a.getAttribute("data-zv-coded") === "1") return;
      try {
        var u = new URL(a.href);
        var text = u.searchParams.get("text") || "";
        if (text.indexOf("cód:") === -1) {
          u.searchParams.set("text", text + " (cód: " + code + ")");
          a.href = u.toString();
        }
        a.setAttribute("data-zv-coded", "1");
      } catch (e) {}
    });
  }

  // decora agora e re-tenta algumas vezes (caso a hidratação do React monte
  // os botões depois do load)
  decorate();
  var tries = 0;
  var iv = setInterval(function () { decorate(); if (++tries >= 5) clearInterval(iv); }, 800);

  // evento de conversão — delegação no document, robusto a re-render
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest(SELECTOR) : null;
    if (!a) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "whatsapp_click",
      utm_source: attrib.utm_source || "(direct)",
      utm_medium: attrib.utm_medium || "",
      utm_campaign: attrib.utm_campaign || "",
      campaign_code: code || ""
    });
  });
})();
