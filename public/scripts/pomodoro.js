// ----------------------------
// Variables y referencias
// ----------------------------
let workTime = parseInt(document.getElementById("work-time").value, 10) * 60;
let breakTime = parseInt(document.getElementById("break-time").value, 10) * 60;
let isRunning = false;
let isWorkTime = true;
let timer;

const timeDisplay = document.querySelector("time");
const workInput = document.getElementById("work-time");
const breakInput = document.getElementById("break-time");

const btnStartPause = document.getElementById("btn-start-pause");
const btnRestart = document.getElementById("btn-restart");

// ----------------------------
// Función para actualizar la pantalla
// ----------------------------
function updateDisplay(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  timeDisplay.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(
    2,
    "0"
  )}`;
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
  // Leer los valores actuales de los inputs
  workTime = parseInt(workInput.value, 10) * 60;
  breakTime = parseInt(breakInput.value, 10) * 60;
  isWorkTime = true;
  updateDisplay(workTime);
}

// ----------------------------
// Cambiar entre Work / Break
// ----------------------------
function switchToBreak() {
  isWorkTime = false;
  breakTime = parseInt(breakInput.value, 10) * 60;
  updateDisplay(breakTime);
  stopTimer(); // Detener automáticamente al cambiar
}

function switchToWork() {
  isWorkTime = true;
  workTime = parseInt(workInput.value, 10) * 60;
  updateDisplay(workTime);
  stopTimer(); // Detener automáticamente al cambiar
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
  if (!isRunning && isWorkTime) {
    workTime = parseInt(workInput.value, 10) * 60;
    updateDisplay(workTime);
  }
});

breakInput.addEventListener("input", () => {
  if (!isRunning && !isWorkTime) {
    breakTime = parseInt(breakInput.value, 10) * 60;
    updateDisplay(breakTime);
  }
});

// ----------------------------
// Inicializar display
// ----------------------------
updateDisplay(workTime);
updateStartPauseIcon();
