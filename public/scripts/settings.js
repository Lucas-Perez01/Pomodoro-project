document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-settings");
  const settingsPanel = document.getElementById("settings-panel");

  const workInputEl = document.getElementById("work-time");
  const breakInputEl = document.getElementById("break-time");
document.addEventListener("DOMContentLoaded", () => {
  // Panel lateral
  const toggleBtn = document.getElementById("toggle-settings");
  const settingsPanel = document.getElementById("settings-panel");
  const closeBtn = document.getElementById("close-settings");

  // Inputs
  const workInputEl = document.getElementById("work-time");
  const breakInputEl = document.getElementById("break-time");

// Actualizar tiempo de trabajo en vivo
workInput.addEventListener("input", () => {
  workTime = parseInt(workInput.value, 10) * 60;

  // Solo actualiza la pantalla si estamos en modo trabajo y el timer está detenido
  if (isWorkTime && !isRunning) {
    updateDisplay(workTime);
  }
});

// Actualizar tiempo de descanso en vivo
breakInput.addEventListener("input", () => {
  breakTime = parseInt(breakInput.value, 10) * 60;

  // Solo actualiza la pantalla si estamos en modo descanso y el timer está detenido
  if (!isWorkTime && !isRunning) {
    updateDisplay(breakTime);
  }
});

// toggle del boton de settings

const toggleBtn = document.getElementById("toggle-settings");
const settingsSection = document.querySelector(".settings");

toggleBtn.addEventListener("click", () => {
  settingsSection.classList.toggle("show");
});

const closeBtn = document.getElementById("close-settings");
const settingsModal = document.getElementById("settings-modal");

closeBtn.addEventListener("click", () => {
  settingsModal.classList.remove("show");
});
