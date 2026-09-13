(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------------- Theme ---------------- */
  var toggle = document.querySelector("[data-theme-toggle]");
  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }
  function labelTheme() {
    if (toggle) {
      toggle.setAttribute(
        "aria-label",
        currentTheme() === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    }
  }
  function setTheme(mode) {
    root.setAttribute("data-theme", mode);
    try {
      localStorage.setItem("halation-theme", mode);
    } catch (e) {}
    labelTheme();
  }
  if (toggle) {
    labelTheme();
    toggle.addEventListener("click", function () {
      setTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  }

  /* ---------------- Mobile menu ---------------- */
  var menuBtn = document.querySelector("[data-menu-toggle]");
  var menu = document.getElementById("mobile-menu");
  if (menuBtn && menu) {
    menu.hidden = true;

    var openMenu = function () {
      menu.hidden = false;
      window.requestAnimationFrame(function () {
        menu.classList.add("is-open");
      });
      menuBtn.setAttribute("aria-expanded", "true");
      menuBtn.setAttribute("aria-label", "Close menu");
    };
    var closeMenu = function () {
      menu.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open menu");
      window.setTimeout(function () {
        if (menuBtn.getAttribute("aria-expanded") === "false") menu.hidden = true;
      }, 360);
    };
    var isOpen = function () {
      return menuBtn.getAttribute("aria-expanded") === "true";
    };

    menuBtn.addEventListener("click", function () {
      isOpen() ? closeMenu() : openMenu();
    });
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
        closeMenu();
        menuBtn.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024 && isOpen()) closeMenu();
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) {
      el.classList.add("is-in");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------------- Copy email ---------------- */
  var copyBtn = document.querySelector("[data-copy]");
  var copyStatus = document.querySelector("[data-copy-status]");
  if (copyBtn) {
    var resetTimer = null;
    var announce = function (message) {
      if (copyStatus) copyStatus.textContent = message;
    };
    var done = function () {
      copyBtn.classList.add("is-copied");
      announce("Email copied to clipboard.");
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(function () {
        copyBtn.classList.remove("is-copied");
        announce("");
      }, 2400);
    };
    var fail = function () {
      announce("Copy failed. Please select the address manually.");
    };

    copyBtn.addEventListener("click", function () {
      var value = copyBtn.getAttribute("data-copy");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done, function () {
          legacyCopy(value) ? done() : fail();
        });
      } else {
        legacyCopy(value) ? done() : fail();
      }
    });
  }

  function legacyCopy(value) {
    try {
      var helper = document.createElement("textarea");
      helper.className = "copy-helper";
      helper.value = value;
      helper.setAttribute("readonly", "");
      document.body.appendChild(helper);
      helper.select();
      var ok = document.execCommand("copy");
      document.body.removeChild(helper);
      return ok;
    } catch (e) {
      return false;
    }
  }

  /* ---------------- Year ---------------- */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
