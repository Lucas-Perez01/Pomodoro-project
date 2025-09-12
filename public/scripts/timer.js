import { updateDisplay, updateSessionLabels } from "./display.js";
import { notifyUser } from "./notifications.js";

// ----------------------------
// Estado del temporizador
// ----------------------------
let workTime = 25 * 60;
let breakTime = 5 * 60;
let isRunning = false;
let isWorkTime = true;
let timer;

// ----------------------------
// Getters y setters (para inputs.js y pomodoro.js)
// ----------------------------
export function setWorkTime(seconds) {
  workTime = seconds;
}
export function setBreakTime(seconds) {
  breakTime = seconds;
}
export function isRunningState() {
  return isRunning;
}
export function isWorkTimeState() {
  return isWorkTime;
}

// ----------------------------
// Control del temporizador
// ----------------------------
export function startTimer() {
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

export function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

export function resetTimer() {
  stopTimer();
  workTime = 25 * 60;
  breakTime = 5 * 60;
  isWorkTime = true;
  updateDisplay(workTime);
  updateSessionLabels(isWorkTime);
}

export function switchToBreak() {
  isWorkTime = false;
  breakTime = 5 * 60;
  updateDisplay(breakTime);
  updateSessionLabels(isWorkTime);
  stopTimer();
  notifyUser("Tiempo de descanso 🛋️");
}

export function switchToWork() {
  isWorkTime = true;
  workTime = 25 * 60;
  updateDisplay(workTime);
  updateSessionLabels(isWorkTime);
  stopTimer();
  notifyUser("Hora de concentrarse 💻");
}
