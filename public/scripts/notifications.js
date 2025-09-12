export function requestPermission() {
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}

export function notifyUser(message) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Pomodoro Timer", {
      body: message,
      icon: "/icons/timer.png",
    });
  }

  const audio = new Audio("/sounds/notification.mp3");
  audio.play().catch(() => {});
}
