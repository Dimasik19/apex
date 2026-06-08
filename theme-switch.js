(function () {
  const buttons = document.querySelectorAll(".theme-button");

  function applyTheme(theme) {
    const nextTheme = theme || "warm";
    document.documentElement.setAttribute("data-theme", nextTheme);
    buttons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.theme === nextTheme);
    });
    window.dispatchEvent(new CustomEvent("apex:themechange", { detail: { theme: nextTheme } }));
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => applyTheme(button.dataset.theme));
  });

  applyTheme("warm");
})();
