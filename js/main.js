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

  function inquiryT(key) {
    var i18n = window.KorosI18n;
    if (!i18n || !i18n.STRINGS) return key;
    var lang = typeof i18n.getLang === "function" ? i18n.getLang() : "ru";
    var dict = i18n.STRINGS[lang] || i18n.STRINGS.ru;
    var s = dict && dict[key];
    return s != null ? s : key;
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

  /** Письма на info@korosbeams.ru через FormSubmit (AJAX, шаблон table). Требуется подтвердить ящик на стороне FormSubmit. */
  var INQUIRY_MAIL_TO = "info@korosbeams.ru";
  var FORMSUBMIT_AJAX = "https://formsubmit.co/ajax/" + encodeURIComponent(INQUIRY_MAIL_TO);

  function formatRuPhone(value) {
    var digits = String(value || "").replace(/\D/g, "");
    if (!digits) return "";
    if (digits.charAt(0) === "8") digits = "7" + digits.slice(1);
    if (digits.charAt(0) === "7") digits = digits.slice(1);
    digits = digits.slice(0, 10);

    var result = "+7";
    if (digits.length > 0) result += " (" + digits.slice(0, 3);
    if (digits.length >= 3) result += ")";
    if (digits.length > 3) result += " " + digits.slice(3, 6);
    if (digits.length > 6) result += "-" + digits.slice(6, 8);
    if (digits.length > 8) result += "-" + digits.slice(8, 10);
    return result;
  }

  function normalizeQuantity(value) {
    var source = String(value || "").replace(",", ".");
    var output = "";
    var hasSeparator = false;

    for (var i = 0; i < source.length; i += 1) {
      var ch = source.charAt(i);
      if (/\d/.test(ch)) {
        output += ch;
      } else if (ch === "." && !hasSeparator && output) {
        output += ".";
        hasSeparator = true;
      }
    }

    return output;
  }

  function getEditablePhoneDigits(value) {
    var digits = String(value || "").replace(/\D/g, "");
    if (digits.charAt(0) === "8") digits = "7" + digits.slice(1);
    if (digits.charAt(0) === "7") digits = digits.slice(1);
    return digits.slice(0, 10);
  }

  function countDigitsBefore(value, index) {
    var count = 0;
    var text = String(value || "").slice(0, Math.max(0, index));
    for (var i = 0; i < text.length; i += 1) {
      if (/\d/.test(text.charAt(i))) count += 1;
    }
    return count;
  }

  function getPhoneCaretByEditableDigits(value, editableCount) {
    var target = Math.max(0, editableCount) + 1;
    var seen = 0;
    for (var i = 0; i < value.length; i += 1) {
      if (/\d/.test(value.charAt(i))) {
        seen += 1;
        if (seen >= target) return i + 1;
      }
    }
    return value.length;
  }

  function initInquiryInputMasks() {
    var phoneEl = document.getElementById("inquiry-phone");
    var qtyEl = document.getElementById("inquiry-qty");

    if (phoneEl) {
      phoneEl.addEventListener("keydown", function (ev) {
        if (ev.key !== "Backspace" && ev.key !== "Delete") return;

        var value = phoneEl.value;
        var digits = getEditablePhoneDigits(value).split("");
        if (!digits.length) return;

        var start = phoneEl.selectionStart == null ? value.length : phoneEl.selectionStart;
        var end = phoneEl.selectionEnd == null ? start : phoneEl.selectionEnd;
        var editableStart = Math.max(0, countDigitsBefore(value, start) - 1);
        var editableEnd = Math.max(0, countDigitsBefore(value, end) - 1);
        var removeFrom = editableStart;
        var removeCount = editableEnd - editableStart;

        if (removeCount <= 0) {
          if (ev.key === "Backspace") {
            removeFrom = editableStart - 1;
          } else {
            removeFrom = editableStart;
          }
          removeCount = 1;
        }

        if (removeFrom < 0 || removeFrom >= digits.length) return;

        ev.preventDefault();
        digits.splice(removeFrom, removeCount);
        phoneEl.value = formatRuPhone("7" + digits.join(""));
        var caret = getPhoneCaretByEditableDigits(phoneEl.value, removeFrom);
        phoneEl.setSelectionRange(caret, caret);
        phoneEl.setCustomValidity("");
      });
      phoneEl.addEventListener("input", function () {
        phoneEl.value = formatRuPhone(phoneEl.value);
        phoneEl.setCustomValidity("");
      });
      phoneEl.addEventListener("blur", function () {
        if (phoneEl.value && !phoneEl.checkValidity()) {
          phoneEl.setCustomValidity(inquiryT("contact.form.phoneInvalid"));
        } else {
          phoneEl.setCustomValidity("");
        }
      });
      phoneEl.addEventListener("focus", function () {
        phoneEl.setCustomValidity("");
      });
    }

    if (qtyEl) {
      qtyEl.addEventListener("input", function () {
        qtyEl.value = normalizeQuantity(qtyEl.value);
      });
    }
  }

  function initContactInquiryForm() {
    var form = document.getElementById("koros-inquiry-form");
    if (!form) return;
    var statusEl = document.getElementById("koros-inquiry-status");
    var submitBtn = document.getElementById("koros-inquiry-submit");
    var honey = document.getElementById("koros-inquiry-honey");

    function setStatus(kind, message) {
      if (!statusEl) return;
      statusEl.textContent = message;
      statusEl.classList.remove(
        "hidden",
        "koros-inquiry-status--ok",
        "koros-inquiry-status--err",
        "koros-inquiry-status--pending"
      );
      if (kind === "ok") statusEl.classList.add("koros-inquiry-status--ok");
      else if (kind === "err") statusEl.classList.add("koros-inquiry-status--err");
      else if (kind === "pending") statusEl.classList.add("koros-inquiry-status--pending");
      else statusEl.classList.add("hidden");
    }

    function parseFormSubmitResponse(res, text) {
      var data = null;
      if (text) {
        try {
          data = JSON.parse(text);
        } catch (e1) {
          data = null;
        }
      }
      var ok =
        res.ok &&
        data &&
        (data.success === true || data.success === "true" || String(data.success).toLowerCase() === "true");
      return { ok: ok, data: data };
    }

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var fullNameEl = document.getElementById("inquiry-full-name");
      var companyEl = document.getElementById("inquiry-company");
      var emailEl = document.getElementById("inquiry-email");
      var phoneEl = document.getElementById("inquiry-phone");
      var select = document.getElementById("inquiry-product");
      var qtyEl = document.getElementById("inquiry-qty");
      var messageEl = document.getElementById("inquiry-message");

      if (phoneEl && phoneEl.value) phoneEl.value = formatRuPhone(phoneEl.value);
      if (qtyEl && qtyEl.value) qtyEl.value = normalizeQuantity(qtyEl.value);

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (honey && honey.value.replace(/\s/g, "")) {
        setStatus("ok", inquiryT("contact.form.success"));
        return;
      }

      var fullName = fullNameEl ? fullNameEl.value.trim() : "";
      var company = companyEl ? companyEl.value.trim() : "";
      var email = emailEl ? emailEl.value.trim() : "";
      var phone = phoneEl ? phoneEl.value.trim() : "";
      var productLabel = "";
      var productValue = "";
      if (select) {
        var opt = select.options[select.selectedIndex];
        productLabel = opt ? opt.textContent.trim() : "";
        productValue = select.value || "";
      }
      var qty = qtyEl ? qtyEl.value.trim() : "";
      var message = messageEl ? messageEl.value.trim() : "";

      var who = fullName || email || "—";
      var subject = inquiryT("contact.form.emailSubject").split("{{who}}").join(who);

      var fd = new FormData();
      fd.append(inquiryT("contact.form.name"), fullName);
      fd.append(inquiryT("contact.form.company"), company || "—");
      fd.append(inquiryT("contact.form.email"), email);
      fd.append(inquiryT("contact.form.phone"), phone || "—");
      fd.append(inquiryT("contact.form.beam"), productLabel + (productValue ? " (" + productValue + ")" : ""));
      fd.append(inquiryT("contact.form.qty"), qty || "—");
      fd.append(inquiryT("contact.form.details"), message || "—");
      fd.append(inquiryT("contact.form.meta.page"), window.location.href);
      fd.append(inquiryT("contact.form.consentRecordKey"), inquiryT("contact.form.consentRecordYes"));
      fd.append("_subject", subject);
      fd.append("_template", "table");
      fd.append("_replyto", email);

      if (submitBtn) submitBtn.disabled = true;
      setStatus("pending", inquiryT("contact.form.sending"));

      fetch(FORMSUBMIT_AJAX, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      })
        .then(function (res) {
          return res.text().then(function (text) {
            return parseFormSubmitResponse(res, text);
          });
        })
        .catch(function () {
          return { ok: false, data: null };
        })
        .then(function (result) {
          if (submitBtn) submitBtn.disabled = false;
          if (result.ok) {
            setStatus("ok", inquiryT("contact.form.success"));
            form.reset();
            return;
          }
          var act =
            result.data &&
            result.data.message &&
            String(result.data.message).toLowerCase().indexOf("activation") !== -1;
          setStatus("err", inquiryT(act ? "contact.form.errorActivate" : "contact.form.error"));
        });
    });
  }

  var COOKIE_CONSENT_KEY = "koros-cookie-consent";

  function initCookieConsentBanner() {
    try {
      if (localStorage.getItem(COOKIE_CONSENT_KEY) === "1") return;
    } catch (e0) {
      /* ignore */
    }
    var bar = document.createElement("div");
    bar.id = "koros-cookie-banner";
    bar.className =
      "fixed bottom-0 left-0 right-0 z-[100] bg-zinc-900 text-zinc-200 text-sm px-4 py-4 md:px-6 md:py-5 shadow-xl border-t border-zinc-700 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between max-w-full";
    bar.setAttribute("role", "dialog");
    bar.setAttribute("aria-modal", "false");
    bar.setAttribute("data-i18n-aria-label", "cookie.banner.dialogAria");
    bar.innerHTML =
      '<div class="min-w-0 flex-1 leading-relaxed pr-2" data-i18n-html="cookie.banner.messageHtml"></div>' +
      '<div class="flex shrink-0 gap-3 sm:self-center">' +
      '<button type="button" class="whitespace-nowrap rounded-lg bg-[#ffd100] text-[#725c00] font-headline font-bold px-5 py-2.5 text-sm hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd100] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900" data-cookie-accept data-i18n="cookie.banner.accept">OK</button>' +
      "</div>";
    document.body.appendChild(bar);
    var i18n = window.KorosI18n;
    if (i18n && typeof i18n.applyLang === "function") {
      i18n.applyLang(typeof i18n.getLang === "function" ? i18n.getLang() : "ru");
    }
    var btn = bar.querySelector("[data-cookie-accept]");
    if (btn) {
      btn.addEventListener("click", function () {
        try {
          localStorage.setItem(COOKIE_CONSENT_KEY, "1");
        } catch (e1) {
          /* ignore */
        }
        bar.remove();
      });
    }
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

  function initProductGalleries() {
    document.querySelectorAll("[data-product-gallery]").forEach(function (gallery) {
      var scope = gallery.parentElement || gallery;
      var image = gallery.querySelector("[data-gallery-image]");
      var thumbs = Array.prototype.slice.call(scope.querySelectorAll("[data-gallery-thumb]"));
      var prev = gallery.querySelector("[data-gallery-prev]");
      var next = gallery.querySelector("[data-gallery-next]");
      if (!image || thumbs.length < 2) return;

      var index = thumbs.findIndex(function (thumb) {
        return thumb.getAttribute("aria-current") === "true";
      });
      if (index < 0) index = 0;

      function setImage(nextIndex) {
        index = (nextIndex + thumbs.length) % thumbs.length;
        var active = thumbs[index];
        var src = active.getAttribute("data-src");
        if (!src) return;
        image.src = src;
        thumbs.forEach(function (thumb, i) {
          thumb.setAttribute("aria-current", i === index ? "true" : "false");
        });
      }

      thumbs.forEach(function (thumb, i) {
        thumb.addEventListener("click", function () {
          setImage(i);
        });
      });

      if (prev) {
        prev.addEventListener("click", function () {
          setImage(index - 1);
        });
      }
      if (next) {
        next.addEventListener("click", function () {
          setImage(index + 1);
        });
      }

      gallery.addEventListener("keydown", function (ev) {
        if (ev.key === "ArrowLeft") {
          ev.preventDefault();
          setImage(index - 1);
        } else if (ev.key === "ArrowRight") {
          ev.preventDefault();
          setImage(index + 1);
        }
      });

      setImage(index);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initMessengerWidget();
    initInquiryPrefill();
    initInquiryInputMasks();
    initCookieConsentBanner();
    initContactInquiryForm();
    initCertificatePreviewDialog();
    initProductGalleries();
    applyTypography(document.body);
  });
})();
