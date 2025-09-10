async function setRandomBackground() {
  try {
    const response = await fetch("/api/background");
    const data = await response.json();

    if (data.url) {
      document.body.style.backgroundImage = `url(${data.url})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    }
  } catch (error) {
    console.error("Error al cargar el fondo:", error);
  }
}

setRandomBackground();

setInterval(setRandomBackground, 15000);
