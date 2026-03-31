/**
 * Koros static site — без зависимостей
 */
(function () {
  "use strict";

  function syncNavToggleUi(toggle, open) {
    if (!toggle) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    var icon = toggle.querySelector(".material-symbols-outlined");
    if (icon) icon.textContent = open ? "close" : "menu";
  }

  function syncAllNavToggles(open) {
    document.querySelectorAll("[data-nav-toggle]").forEach(function (t) {
      syncNavToggleUi(t, open);
    });
  }

  function closePanel(panel) {
    panel.classList.add("hidden");
    syncAllNavToggles(false);
    document.body.classList.remove("overflow-hidden");
  }

  function initNav() {
    var panel = document.querySelector("[data-nav-panel]");
    if (!panel) return;
    var toggles = document.querySelectorAll("[data-nav-toggle]");
    if (!toggles.length) return;

    Array.prototype.forEach.call(toggles, function (toggle) {
      toggle.addEventListener("click", function () {
        panel.classList.toggle("hidden");
        var open = !panel.classList.contains("hidden");
        syncAllNavToggles(open);
        document.body.classList.toggle("overflow-hidden", open);
      });
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closePanel(panel);
      });
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 768px)").matches) {
        closePanel(panel);
      }
    });

    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && !panel.classList.contains("hidden")) {
        closePanel(panel);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", initNav);
})();
