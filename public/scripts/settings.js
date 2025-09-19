document.addEventListener("DOMContentLoaded", () => {
  const toggleBtnDesktop = document.getElementById("toggle-settings");
  const toggleBtnMobile = document.getElementById("toggle-settings-mobile");
  const settingsPanel = document.getElementById("settings-panel");

  function togglePanel() {
    settingsPanel.classList.toggle("show");
  }

  if (toggleBtnDesktop) {
    toggleBtnDesktop.addEventListener("click", togglePanel);
  }

  if (toggleBtnMobile) {
    toggleBtnMobile.addEventListener("click", togglePanel);
  }
});
