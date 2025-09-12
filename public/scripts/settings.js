document.addEventListener("DOMContentLoaded", () => {
  // Panel lateral
  const toggleBtn = document.getElementById("toggle-settings");
  const settingsPanel = document.getElementById("settings-panel");

  // Inputs
  const workInputEl = document.getElementById("work-time");
  const breakInputEl = document.getElementById("break-time");

  // Abrir panel lateral
  toggleBtn.addEventListener("click", () => {
    settingsPanel.classList.toggle("show");
  });

  // Función para manejar input de forma segura
  function handleInput(inputEl, isWork) {
    inputEl.addEventListener("input", () => {
      const val = inputEl.value;

      // Permitir input vacío temporalmente
      if (val === "") return;

      let num = parseInt(val, 10);

      if (!isNaN(num) && num > 0) {
        if (num > 999) num = 999; // límite máximo
        inputEl.value = num; // actualizar input
        if (isWork) {
          workTime = num * 60;
          if (isWorkTime && !isRunning) updateDisplay(workTime);
        } else {
          breakTime = num * 60;
          if (!isWorkTime && !isRunning) updateDisplay(breakTime);
        }
      }
    });
  }

  handleInput(workInputEl, true);
  handleInput(breakInputEl, false);
});
