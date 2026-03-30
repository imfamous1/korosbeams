/**
 * Вставка общей шапки и подвала из js/site-chrome-html.js (см. scripts/bundle_chrome.py).
 */
(function () {
  "use strict";

  var DESKTOP_ON =
    "text-[#725c00] dark:text-[#ffd100] font-semibold border-b-2 border-[#ffd100] pb-0.5";
  var DESKTOP_OFF =
    "text-zinc-600 dark:text-zinc-400 font-medium hover:text-[#725c00] dark:hover:text-[#ffd100] transition-colors";
  var MOBILE_ON = "py-2.5 text-lg font-headline font-semibold text-[#725c00] dark:text-[#ffd100]";
  var MOBILE_OFF =
    "py-2.5 text-lg font-headline font-semibold text-on-surface hover:text-[#725c00] dark:hover:text-[#ffd100] transition-colors";

  function applyNavActive(active) {
    document.querySelectorAll("a[data-koros-nav]").forEach(function (el) {
      var key = el.getAttribute("data-koros-nav");
      var isMobile = !!el.closest("#site-mobile-nav");
      var on = key === active;
      if (isMobile) {
        el.className = on ? MOBILE_ON : MOBILE_OFF;
        if (on) el.setAttribute("aria-current", "page");
        else el.removeAttribute("aria-current");
      } else {
        var c = on ? DESKTOP_ON : DESKTOP_OFF;
        if (on && key === "contact") c += " whitespace-nowrap";
        el.className = c;
        if (on) el.setAttribute("aria-current", "page");
        else el.removeAttribute("aria-current");
      }
    });
  }

  function mountChrome() {
    var h = window.__KOROS_HEADER_HTML__;
    var f = window.__KOROS_FOOTER_HTML__;
    if (!h || !f) {
      console.error("Koros: нет разметки шапки/подвала. Запустите: python3 scripts/bundle_chrome.py");
      return;
    }
    var he = document.getElementById("koros-site-header");
    var fe = document.getElementById("koros-site-footer");
    if (he) he.innerHTML = h;
    if (fe) fe.innerHTML = f;
    var nav = document.documentElement.getAttribute("data-koros-nav") || "home";
    applyNavActive(nav);
  }

  document.addEventListener("DOMContentLoaded", mountChrome);
})();
