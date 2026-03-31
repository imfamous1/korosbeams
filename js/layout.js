/**
 * Вставка общей шапки и подвала из js/site-chrome-html.js (см. scripts/bundle_chrome.py).
 */
(function () {
  "use strict";

  var DESKTOP_ON =
    "text-[16px] leading-tight text-[#725c00] dark:text-[#ffd100] font-semibold border-b-2 border-[#ffd100] pb-0.5";
  var DESKTOP_OFF =
    "text-[16px] leading-tight text-zinc-600 dark:text-zinc-400 font-medium hover:text-[#725c00] dark:hover:text-[#ffd100] transition-colors";
  var MOBILE_ON =
    "py-2.5 text-[16px] leading-snug font-headline font-semibold text-[#725c00] dark:text-[#ffd100]";
  var MOBILE_OFF =
    "py-2.5 text-[16px] leading-snug font-headline font-semibold text-on-surface hover:text-[#725c00] dark:hover:text-[#ffd100] transition-colors";

  function syncKorosHeaderHeight() {
    var bar = document.querySelector("[data-koros-header-bar]");
    if (!bar) return;
    var px = Math.ceil(bar.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--koros-header-height", px + "px");
  }

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

    syncKorosHeaderHeight();
    var bar = document.querySelector("[data-koros-header-bar]");
    if (bar && typeof ResizeObserver !== "undefined") {
      var ro = new ResizeObserver(function () {
        syncKorosHeaderHeight();
      });
      ro.observe(bar);
    }
    window.addEventListener("resize", syncKorosHeaderHeight);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(syncKorosHeaderHeight).catch(function () {});
    }
    requestAnimationFrame(function () {
      requestAnimationFrame(syncKorosHeaderHeight);
    });
  }

  window.KorosLayout = {
    syncHeaderHeight: syncKorosHeaderHeight,
  };

  document.addEventListener("DOMContentLoaded", mountChrome);
})();
