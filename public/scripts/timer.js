import { updateDisplay, updateSessionLabels } from "./display.js";
import { notifyUser } from "./notifications.js";

// Estado del temporizador

let workTime = 25 * 60;
let breakTime = 5 * 60;
let isRunning = false;
let isWorkTime = true;
let timer;
let hasStarted = false; //

// Getters y setters

export function setWorkTime(seconds) {
  workTime = seconds;
  console.log("[setWorkTime]", seconds);
}
export function setBreakTime(seconds) {
  breakTime = seconds;
  console.log("[setBreakTime]", seconds);
}
export function isRunningState() {
  return isRunning;
}
export function isWorkTimeState() {
  return isWorkTime;
}

// Control del temporizador

export function startTimer() {
  if (isRunning) return;
  isRunning = true;
  hasStarted = true;
  console.log("[startTimer] iniciado →", {
    workTime,
    breakTime,
    isWorkTime,
    hasStarted,
  });

  timer = setInterval(() => {
    if (isWorkTime) {
      workTime--;
      updateDisplay(workTime);
      console.log("[tick] Focus:", workTime);
      if (workTime <= 0) switchToBreak();
    } else {
      breakTime--;
      updateDisplay(breakTime);
      console.log("[tick] Break:", breakTime);
      if (breakTime <= 0) switchToWork();
    }
  }, 1000);
}

export function stopTimer() {
  clearInterval(timer);
  isRunning = false;
  console.log("[stopTimer] detenido");
}

export function resetTimer() {
  stopTimer();
  workTime = 25 * 60;
  breakTime = 5 * 60;
  isWorkTime = true;
  hasStarted = false;
  updateDisplay(workTime);
  updateSessionLabels(isWorkTime);
  console.log("[resetTimer] reiniciado");
}

export function switchToBreak() {
  isWorkTime = false;
  breakTime = 5 * 60;
  updateDisplay(breakTime);
  updateSessionLabels(isWorkTime);
  stopTimer();
  console.log("[switchToBreak] ejecutado → hasStarted:", hasStarted);
  if (hasStarted) {
    notifyUser("Tiempo de descanso 🛋️");
  }
}

export function switchToWork() {
  isWorkTime = true;
  workTime = 25 * 60;
  updateDisplay(workTime);
  updateSessionLabels(isWorkTime);
  stopTimer();
  console.log("[switchToWork] ejecutado → hasStarted:", hasStarted);
  if (hasStarted) {
    notifyUser("Hora de concentrarse 💻");
  }
}
