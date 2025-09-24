async function setRandomBackground() {
  try {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const response = await fetch(`/api/background?w=${width}&h=${height}`);
    const data = await response.json();

    if (data.url) {
      const img = new Image();
      img.src = data.url;

      img.onload = () => {
        document.body.style.backgroundImage = `url(${data.url})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.transition = "background-image 0.6s ease-in-out";
      };
    }
  } catch (error) {
    console.error("Error al cargar el fondo:", error);
  }
}

setRandomBackground();
setInterval(setRandomBackground, 15000);
