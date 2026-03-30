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

  function closePanel(panel, toggle) {
    panel.classList.add("hidden");
    syncNavToggleUi(toggle, false);
    document.body.classList.remove("overflow-hidden");
  }

  function initNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var panel = document.querySelector("[data-nav-panel]");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", function () {
      panel.classList.toggle("hidden");
      var open = !panel.classList.contains("hidden");
      syncNavToggleUi(toggle, open);
      document.body.classList.toggle("overflow-hidden", open);
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closePanel(panel, toggle);
      });
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 768px)").matches) {
        closePanel(panel, toggle);
      }
    });

    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && !panel.classList.contains("hidden")) {
        closePanel(panel, toggle);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", initNav);
})();
