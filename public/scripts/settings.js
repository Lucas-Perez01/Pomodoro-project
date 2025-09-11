document.addEventListener("DOMContentLoaded", () => {
  // Panel lateral
  const toggleBtn = document.getElementById("toggle-settings");
  const settingsPanel = document.getElementById("settings-panel");
  const closeBtn = document.getElementById("close-settings");

  // Inputs
  const workInputEl = document.getElementById("work-time");
  const breakInputEl = document.getElementById("break-time");

  // Abrir panel lateral
  toggleBtn.addEventListener("click", () => {
    settingsPanel.classList.toggle("show");
  });

  // Actualización en vivo de tiempos
  workInputEl.addEventListener("input", () => {
    workTime = parseInt(workInputEl.value, 10) * 60;
    if (isWorkTime && !isRunning) updateDisplay(workTime);
  });

  breakInputEl.addEventListener("input", () => {
    breakTime = parseInt(breakInputEl.value, 10) * 60;
    if (!isWorkTime && !isRunning) updateDisplay(breakTime);
  });
});
