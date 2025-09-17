document.addEventListener("DOMContentLoaded", () => {
  const audioPlayer = document.getElementById("audio-player");
  const trackTitle = document.getElementById("track-title");
  const trackImg = document.getElementById("track-img");
  const btnPlayPause = document.getElementById("btn-play-pause");
  const btnNext = document.getElementById("btn-next");
  const musicMenu = document.getElementById("music-menu");
  const musicList = document.getElementById("music-list");
  const playPauseIcon = btnPlayPause.querySelector("ion-icon");
  const trackInfo = document.getElementById("track-info");

  // 🎵 volumen
  const volumeBtn = document.getElementById("volume-btn");
  const volumeSlider = document.getElementById("volume-slider");
  const volumeContainer = document.querySelector(".volume-container");

  let streams = [];
  let currentTrackIndex = 0;

  // inicializar volumen
  audioPlayer.volume = volumeSlider.value;

  // cambiar volumen con el slider
  volumeSlider.addEventListener("input", () => {
    audioPlayer.volume = volumeSlider.value;

    // cambiar icono dinámicamente
    if (volumeSlider.value == 0) {
      volumeBtn
        .querySelector("ion-icon")
        .setAttribute("name", "volume-mute-outline");
    } else if (volumeSlider.value < 0.5) {
      volumeBtn
        .querySelector("ion-icon")
        .setAttribute("name", "volume-low-outline");
    } else {
      volumeBtn
        .querySelector("ion-icon")
        .setAttribute("name", "volume-high-outline");
    }
  });

  // mostrar/ocultar slider
  volumeBtn.addEventListener("click", () => {
    volumeContainer.classList.toggle("show-slider");
  });

  // Cargar música desde music.json
  async function fetchMusicData() {
    try {
      const response = await fetch("./data/music.json");
      const data = await response.json();
      streams = data.streams;

      if (streams.length === 0) return;

      generateMusicCards();
      updateAndLoadTrack();
    } catch (error) {
      console.error("Error al cargar música:", error);
    }
  }

  function generateMusicCards() {
    musicList.innerHTML = "";
    streams.forEach((track, index) => {
      const trackCard = document.createElement("div");
      trackCard.classList.add("track-card");

      // Contenedor interno para escalar sin afectar el scroll
      const trackInner = document.createElement("div");
      trackInner.classList.add("track-inner");
      trackInner.innerHTML = `
      <img src="${track.img}" alt="${track.title}" />
      <span>${track.title}</span>
    `;

      trackCard.appendChild(trackInner);

      trackCard.addEventListener("click", () => {
        currentTrackIndex = index;
        updateAndLoadTrack();
        playTrack();
        musicMenu.classList.remove("show");
      });

      musicList.appendChild(trackCard);
    });
  }

  function updateAndLoadTrack() {
    const track = streams[currentTrackIndex];
    trackTitle.textContent = track.title;
    trackImg.src = track.img;
    audioPlayer.src = track.src;
    audioPlayer.load();
  }

  function playTrack() {
    audioPlayer
      .play()
      .catch((err) => console.error("Error al reproducir audio:", err));
  }

  btnPlayPause.addEventListener("click", () => {
    audioPlayer.paused ? playTrack() : audioPlayer.pause();
  });

  btnNext.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex + 1) % streams.length;
    updateAndLoadTrack();
    playTrack();
  });

  trackInfo.addEventListener("click", () => {
    musicMenu.classList.toggle("show");
  });

  audioPlayer.addEventListener("play", () =>
    playPauseIcon.setAttribute("name", "pause-circle-outline")
  );
  audioPlayer.addEventListener("pause", () =>
    playPauseIcon.setAttribute("name", "play-circle-outline")
  );

  fetchMusicData();
});
