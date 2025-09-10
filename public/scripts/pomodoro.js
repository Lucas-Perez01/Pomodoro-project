let workTime = 25 * 60;
let breakTime = 5 * 60;
let isRunning = false;
let isWorkTime = true;
let timer;

const timeDisplay = document.querySelector("time");
const startBtn = document.querySelector(".btn-start");
const stopBtn = document.querySelector(".btn-stop");
const resetBtn = document.querySelector(".btn-reset");

// Función para actualizar la pantalla
function updateDisplay(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  timeDisplay.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(
    2,
    "0"
  )}`;
}

// Función del temporizador
function startTimer() {
  if (isRunning) return;
  isRunning = true;

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

// Pausar el temporizador
function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

// Reiniciar el temporizador
function resetTimer() {
  stopTimer();
  workTime = 25 * 60;
  breakTime = 5 * 60;
  isWorkTime = true;
  updateDisplay(workTime);
}

// Cambiar a descanso
function switchToBreak() {
  isWorkTime = false;
  breakTime = 5 * 60;
  updateDisplay(breakTime);
}

// Cambiar a foco
function switchToWork() {
  isWorkTime = true;
  workTime = 25 * 60;
  updateDisplay(workTime);
}

// Event listeners
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

// Inicializar display
updateDisplay(workTime);
