(() => {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const icon = document.querySelector(".theme-icon");
  if (!toggle || !icon) return;

  const savedTheme = localStorage.getItem("portfolio-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  function applyTheme(theme) {
    root.dataset.theme = theme;
    icon.textContent = theme === "dark" ? "☀" : "☾";
    toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = theme === "dark" ? "#191b19" : "#f4f1eb";
  }

  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));
  toggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("portfolio-theme", nextTheme);
    applyTheme(nextTheme);
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();