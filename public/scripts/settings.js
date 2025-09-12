document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-settings");
  const settingsPanel = document.getElementById("settings-panel");

  toggleBtn.addEventListener("click", () => {
    settingsPanel.classList.toggle("show");
  });
});
