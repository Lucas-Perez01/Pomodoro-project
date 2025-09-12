export function getTimeFromInput(inputEl) {
  const valStr = inputEl.value;

  // Permitir input vacío temporalmente
  if (valStr === "") return 0;

  let val = parseInt(valStr, 10);

  // Validación: si no es número o menor a 1 → poner 1
  if (isNaN(val) || val < 1) val = 1;

  // Límite máximo
  if (val > 999) val = 999;

  // Reflejar el valor corregido en el input
  inputEl.value = val;

  return val * 60; // devolver segundos
}

export function setupInputListeners(
  workInputEl,
  breakInputEl,
  updateDisplay,
  isRunningState,
  isWorkTimeState,
  setWorkTime,
  setBreakTime
) {
  workInputEl.addEventListener("input", () => {
    if (!isRunningState() && isWorkTimeState()) {
      const newTime = getTimeFromInput(workInputEl);
      if (newTime > 0) setWorkTime(newTime);
      if (workInputEl.value !== "") updateDisplay(newTime);
    }
  });

  breakInputEl.addEventListener("input", () => {
    if (!isRunningState() && !isWorkTimeState()) {
      const newTime = getTimeFromInput(breakInputEl);
      if (newTime > 0) setBreakTime(newTime);
      if (breakInputEl.value !== "") updateDisplay(newTime);
    }
  });
}
