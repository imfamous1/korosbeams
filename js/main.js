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

  function initMessengerWidget() {
    var widget = document.querySelector("[data-chat-widget]");
    if (!widget) return;

    var panel = widget.querySelector("[data-chat-widget-panel]");
    var toggle = widget.querySelector("[data-chat-widget-toggle]");
    var closeBtn = widget.querySelector("[data-chat-widget-close]");
    if (!panel || !toggle || !closeBtn) return;

    function setOpen(open) {
      panel.classList.toggle("hidden", !open);
      panel.setAttribute("aria-hidden", open ? "false" : "true");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    toggle.addEventListener("click", function () {
      var open = panel.classList.contains("hidden");
      setOpen(open);
    });

    closeBtn.addEventListener("click", function () {
      setOpen(false);
    });

    document.addEventListener("click", function (ev) {
      if (panel.classList.contains("hidden")) return;
      if (!widget.contains(ev.target)) setOpen(false);
    });

    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && !panel.classList.contains("hidden")) {
        setOpen(false);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initMessengerWidget();
  });
})();
