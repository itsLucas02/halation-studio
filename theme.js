(function () {
  var mode = "light";
  try {
    var stored = localStorage.getItem("halation-theme");
    if (stored === "light" || stored === "dark") {
      mode = stored;
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      mode = "dark";
    }
  } catch (e) {}
  document.documentElement.setAttribute("data-theme", mode);
  document.documentElement.classList.add("js");
})();
