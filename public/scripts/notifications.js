export function requestPermission() {
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}

export function notifyUser(message = "focus") {
  // icono y sonido dependiendo del tipo
  // const icon = type === "break" ? "/icons/break.png" : "/icons/focus.png";
  const sound = "/assets/sounds/bell-notification-337658.mp3";

  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Pomodoro Timer", {
      body: message,
    });
  }

  const audio = new Audio(sound);
  audio.play().catch(() => {});
}
