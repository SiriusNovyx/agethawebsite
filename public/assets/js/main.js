(function () {
  "use strict";

  var appWindow = document.getElementById("app-window");
  var windowBody = document.getElementById("window-body");
  var shortcut = document.getElementById("desktop-shortcut");
  var minimizeButton = document.getElementById("minimize-button");
  var maximizeButton = document.getElementById("maximize-button");
  var closeButton = document.getElementById("close-button");
  var exitMenuButton = document.getElementById("exit-menu-button");

  function closeMenus() {
    document.querySelectorAll(".menu[open]").forEach(function (menu) {
      menu.removeAttribute("open");
    });
  }

  function restoreWindow() {
    appWindow.classList.remove("is-closed", "is-minimized");
    shortcut.classList.remove("is-visible");
    minimizeButton.setAttribute("aria-label", "Minimize Agetha.exe");
    windowBody.removeAttribute("aria-hidden");
    appWindow.focus();
  }

  function closeWindow() {
    appWindow.classList.add("is-closed");
    shortcut.classList.add("is-visible");
    closeMenus();
    shortcut.focus();
  }

  minimizeButton.addEventListener("click", function () {
    var minimized = appWindow.classList.toggle("is-minimized");
    minimizeButton.setAttribute("aria-label", minimized ? "Restore Agetha.exe" : "Minimize Agetha.exe");
    if (minimized) {
      windowBody.setAttribute("aria-hidden", "true");
    } else {
      windowBody.removeAttribute("aria-hidden");
    }
  });

  maximizeButton.addEventListener("click", function () {
    var maximized = appWindow.classList.toggle("is-maximized");
    maximizeButton.setAttribute("aria-pressed", String(maximized));
    maximizeButton.setAttribute("aria-label", maximized ? "Restore Agetha.exe" : "Maximize Agetha.exe");
  });

  closeButton.addEventListener("click", closeWindow);
  exitMenuButton.addEventListener("click", closeWindow);
  shortcut.addEventListener("dblclick", restoreWindow);
  shortcut.addEventListener("click", restoreWindow);

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".menu")) {
      closeMenus();
    }
  });

  document.querySelectorAll(".menu").forEach(function (menu) {
    menu.addEventListener("toggle", function () {
      if (!menu.open) {
        return;
      }
      document.querySelectorAll(".menu[open]").forEach(function (otherMenu) {
        if (otherMenu !== menu) {
          otherMenu.removeAttribute("open");
        }
      });
    });
  });
}());
