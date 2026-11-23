// Theme toggle (light/dark, saved in localStorage) and the phone menu drawer.
(function () {
  "use strict";

  var root = document.documentElement;
  var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function currentTheme() {
    return root.dataset.theme || (darkQuery.matches ? "dark" : "light");
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      // Storage may be blocked (private mode); the choice then lasts for this page only.
    }
    document.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
  }

  var themeButton = document.querySelector(".theme-toggle");
  if (themeButton) {
    themeButton.addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  }

  var menuButton = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");
  if (menuButton && nav) {
    var setOpen = function (open) {
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
    };
    menuButton.addEventListener("click", function () {
      setOpen(menuButton.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        menuButton.focus();
      }
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });
  }

  // giscus reads its theme once; tell the iframe when the site theme changes.
  document.addEventListener("themechange", function (event) {
    var frame = document.querySelector("iframe.giscus-frame");
    if (!frame) return;
    frame.contentWindow.postMessage(
      { giscus: { setConfig: { theme: event.detail === "dark" ? "dark" : "light" } } },
      "https://giscus.app",
    );
  });
})();
