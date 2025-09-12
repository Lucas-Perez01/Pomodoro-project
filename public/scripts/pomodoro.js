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
// Función para leer input seguro
// ----------------------------
function getTimeFromInput(inputEl) {
  let val = parseInt(inputEl.value, 10);
  if (isNaN(val) || val < 1) val = 1;
  if (val > 999) val = 999;
  inputEl.value = val;
  return val * 60;
}

// ----------------------------
// Función para actualizar display
// ----------------------------
function updateDisplay(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    timeDisplay.textContent = `${String(h).padStart(2, "0")}:${String(
      m
    ).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  } else {
    timeDisplay.textContent = `${String(m).padStart(2, "0")}:${String(
      s
    ).padStart(2, "0")}`;
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
  const val = parseInt(workInput.value, 10);
  if (!isRunning && isWorkTime && !isNaN(val) && val > 0) {
    workTime = val * 60;
    updateDisplay(workTime);
  }
});

breakInput.addEventListener("input", () => {
  const val = parseInt(breakInput.value, 10);
  if (!isRunning && !isWorkTime && !isNaN(val) && val > 0) {
    breakTime = val * 60;
    updateDisplay(breakTime);
  }
});

// ----------------------------
// Inicializar display
// ----------------------------
updateDisplay(workTime);
updateStartPauseIcon();
