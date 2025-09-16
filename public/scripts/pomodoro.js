import { updateDisplay, updateSessionLabels } from "./display.js";
import { getTimeFromInput, setupInputListeners } from "./inputs.js";
import { notifyUser, requestPermission } from "./notifications.js";

let workTime, breakTime;
let isRunning = false;
let isWorkTime = true;
let timer;

document.addEventListener("DOMContentLoaded", () => {
  requestPermission();

  // Valores iniciales
  workTime = 25 * 60;
  breakTime = 5 * 60;

  updateDisplay(workTime);
  updateSessionLabels(isWorkTime);
  updateStartPauseIcon();

  const workInputEl = document.getElementById("work-time");
  const breakInputEl = document.getElementById("break-time");

  // Setup listeners de inputs
  setupInputListeners(
    workInputEl,
    breakInputEl,
    updateDisplay,
    () => isRunning,
    () => isWorkTime,
    (val) => (workTime = val),
    (val) => (breakTime = val)
  );

  // Botones
  document.querySelector("#btn-start-pause").addEventListener("click", () => {
    if (!isRunning) startTimer();
    else stopTimer();
  });

  document.querySelector("#btn-restart").addEventListener("click", resetTimer);
});

// Temporizador

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
  workTime = getTimeFromInput(document.getElementById("work-time"));
  breakTime = getTimeFromInput(document.getElementById("break-time"));
  isWorkTime = true;
  updateDisplay(workTime);
  updateSessionLabels(isWorkTime);
}

// Cambiar entre Focus / Break

function switchToBreak() {
  isWorkTime = false;
  breakTime = getTimeFromInput(document.getElementById("break-time"));
  updateDisplay(breakTime);
  updateSessionLabels(isWorkTime);
  stopTimer();
  notifyUser("Tiempo de descanso 🛋️");
}

function switchToWork() {
  isWorkTime = true;
  workTime = getTimeFromInput(document.getElementById("work-time"));
  updateDisplay(workTime);
  updateSessionLabels(isWorkTime);
  stopTimer();
  notifyUser("Hora de concentrarse 💻");
}

// Icono play/pause

function updateStartPauseIcon() {
  const btn = document.querySelector("#btn-start-pause");
  if (isRunning) {
    btn.innerHTML = '<ion-icon name="pause-sharp"></ion-icon>';
    btn.setAttribute("aria-label", "Pause Timer");
  } else {
    btn.innerHTML = '<ion-icon name="play-sharp"></ion-icon>';
    btn.setAttribute("aria-label", "Start Timer");
  }
}
