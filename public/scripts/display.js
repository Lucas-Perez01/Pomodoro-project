const timeDisplay = document.querySelector("#time");
const focusLabel = document.querySelector("#focus-label");
const breakLabel = document.querySelector("#break-label");

export function updateDisplay(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  timeDisplay.textContent =
    h > 0
      ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      : `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function updateSessionLabels(isWorkTime) {
  if (isWorkTime) {
    focusLabel.classList.add("active");
    breakLabel.classList.remove("active");
  } else {
    breakLabel.classList.add("active");
    focusLabel.classList.remove("active");
  }
}
