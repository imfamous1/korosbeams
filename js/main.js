/**
 * Koros static site — без зависимостей
 */
(function () {
  "use strict";

  var NBSP = "\u00A0";
  var TYPOGRAPHY_SKIP_TAGS = {
    SCRIPT: true,
    STYLE: true,
    NOSCRIPT: true,
    TEXTAREA: true,
    INPUT: true,
    SELECT: true,
    OPTION: true,
    PRE: true,
    CODE: true,
    KBD: true,
    SAMP: true,
    VAR: true,
    SVG: true,
    MATH: true,
  };
  var RU_SHORT_WORDS = [
    "и",
    "а",
    "но",
    "да",
    "или",
    "либо",
    "в",
    "во",
    "к",
    "ко",
    "с",
    "со",
    "у",
    "о",
    "об",
    "обо",
    "от",
    "до",
    "по",
    "на",
    "за",
    "из",
    "без",
    "для",
    "при",
    "не",
    "ни",
  ];
  var EN_SHORT_WORDS = ["a", "an", "and", "or", "to", "of", "in", "on", "at", "by", "for", "if", "as"];
  var SHORT_WORDS_RE = new RegExp(
    "(^|[\\s\\u00A0(«\"'])(" + RU_SHORT_WORDS.join("|") + "|" + EN_SHORT_WORDS.join("|") + ")\\s+(?=[\\p{L}\\d])",
    "giu"
  );
  var NUMBER_UNITS_RE = /(\d)\s+(%|мм|см|дм|м|км|м2|м²|м3|м³|г|кг|т|мг|л|мл|кн|kn|квт|kw|вт|w|°c|°f)\b/giu;

  function applyTypographyToText(text) {
    if (!text || text.indexOf(" ") === -1) return text;
    return text
      .replace(SHORT_WORDS_RE, "$1$2" + NBSP)
      .replace(/(\d)\s*%/g, "$1" + NBSP + "%")
      .replace(/%\s+(\d)/g, "%" + NBSP + "$1")
      .replace(NUMBER_UNITS_RE, "$1" + NBSP + "$2")
      .replace(/№\s+(\d)/g, "№" + NBSP + "$1");
  }

  function shouldSkipTypographyNode(node) {
    var parent = node && node.parentElement;
    if (!parent) return true;
    if (parent.closest("[data-no-typography]")) return true;
    if (parent.closest("[contenteditable='true']")) return true;
    return !!parent.closest(Object.keys(TYPOGRAPHY_SKIP_TAGS).join(","));
  }

  function applyTypography(root) {
    var scope = root && root.nodeType === Node.ELEMENT_NODE ? root : document.body;
    if (!scope) return;
    var walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    var node = walker.nextNode();
    while (node) {
      if (!shouldSkipTypographyNode(node)) {
        var original = node.nodeValue;
        var formatted = applyTypographyToText(original);
        if (formatted !== original) node.nodeValue = formatted;
      }
      node = walker.nextNode();
    }
  }

  window.KorosTypography = {
    apply: applyTypography,
    formatText: applyTypographyToText,
  };

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

  function initInquiryPrefill() {
    var select = document.getElementById("inquiry-product");
    if (!select) return;
    var params = new URLSearchParams(window.location.search);
    var product = params.get("product");
    if (!product) return;
    var has = Array.prototype.some.call(select.options, function (opt) {
      return opt.value === product;
    });
    if (has) select.value = product;
  }

  function initCertificatePreviewDialog() {
    var dialog = document.querySelector("[data-cert-preview-dialog]");
    if (!dialog) return;

    var triggers = document.querySelectorAll("[data-cert-preview-open]");
    var closeButtons = dialog.querySelectorAll("[data-cert-preview-close]");

    function closeDialog() {
      if (typeof dialog.close === "function" && dialog.open) {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
        document.body.classList.remove("overflow-hidden");
      }
    }

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        if (typeof dialog.showModal === "function") {
          dialog.showModal();
        } else {
          dialog.setAttribute("open", "");
        }
        document.body.classList.add("overflow-hidden");
      });
    });

    closeButtons.forEach(function (button) {
      button.addEventListener("click", closeDialog);
    });

    dialog.addEventListener("click", function (ev) {
      if (ev.target === dialog) closeDialog();
    });

    dialog.addEventListener("close", function () {
      document.body.classList.remove("overflow-hidden");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initMessengerWidget();
    initInquiryPrefill();
    initCertificatePreviewDialog();
    applyTypography(document.body);
  });
})();
