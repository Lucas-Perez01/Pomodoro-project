// ----------------------------
// Variables y referencias
// ----------------------------
let workTime = getTimeFromInput(document.getElementById("work-time"));
let breakTime = getTimeFromInput(document.getElementById("break-time"));
let isRunning = false;
let isWorkTime = true;
let timer;

const timeDisplay = document.querySelector("time");
const workInput = document.getElementById("work-time");
const breakInput = document.getElementById("break-time");

const btnStartPause = document.getElementById("btn-start-pause");
const btnRestart = document.getElementById("btn-restart");

// ----------------------------
// Función para leer inputs de forma segura
// ----------------------------
function getTimeFromInput(inputEl) {
  let val = parseInt(inputEl.value, 10);

  // Si está vacío o menor a 1, usar mínimo 1 minuto
  if (isNaN(val) || val < 1) val = 1;

  // Limitar máximo 999 minutos
  if (val > 999) val = 999;

  // Actualizar input para reflejar límites
  inputEl.value = val;

  return val * 60; // Convertir a segundos
}

// ----------------------------
// Función para actualizar la pantalla
// ----------------------------
function updateDisplay(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    timeDisplay.textContent = `${h}:${String(m).padStart(2, "0")}:${String(
      s
    ).padStart(2, "0")}`;
  } else {
    // Mostrar mínimo 01:00
    timeDisplay.textContent = `${String(Math.max(m, 1)).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  }
}

// ----------------------------
// Temporizador
// ----------------------------
function startTimer() {
  if (isRunning) return;
  isRunning = true;
  updateStartPauseIcon();

  timer = setInterval(() => {
    if (isWorkTime) {
      workTime--;
      updateDisplay(workTime);
      if (workTime <= 0) switchToBreak();
    } else {
      breakTime--;
      updateDisplay(breakTime);
      if (breakTime <= 0) switchToWork();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
  updateStartPauseIcon();
}

function resetTimer() {
  stopTimer();
  workTime = getTimeFromInput(workInput);
  breakTime = getTimeFromInput(breakInput);
  isWorkTime = true;
  updateDisplay(workTime);
}

// ----------------------------
// Cambiar entre Work / Break
// ----------------------------
function switchToBreak() {
  isWorkTime = false;
  breakTime = getTimeFromInput(breakInput);
  updateDisplay(breakTime);
  stopTimer();
}

function switchToWork() {
  isWorkTime = true;
  workTime = getTimeFromInput(workInput);
  updateDisplay(workTime);
  stopTimer();
}

// ----------------------------
// Actualizar icono Start / Pause
// ----------------------------
function updateStartPauseIcon() {
  if (isRunning) {
    btnStartPause.innerHTML = '<ion-icon name="pause-sharp"></ion-icon>';
    btnStartPause.setAttribute("aria-label", "Pause Timer");
  } else {
    btnStartPause.innerHTML = '<ion-icon name="play-sharp"></ion-icon>';
    btnStartPause.setAttribute("aria-label", "Start Timer");
  }
}

// ----------------------------
// Event listeners
// ----------------------------
btnStartPause.addEventListener("click", () => {
  if (!isRunning) startTimer();
  else stopTimer();
});

btnRestart.addEventListener("click", resetTimer);

// Inputs actualizan los tiempos en vivo si el temporizador está detenido
workInput.addEventListener("input", () => {
  workTime = getTimeFromInput(workInput);
  if (!isRunning && isWorkTime) updateDisplay(workTime);
});

breakInput.addEventListener("input", () => {
  breakTime = getTimeFromInput(breakInput);
  if (!isRunning && !isWorkTime) updateDisplay(breakTime);
});

// ----------------------------
// Inicializar display
// ----------------------------
updateDisplay(workTime);
updateStartPauseIcon();
