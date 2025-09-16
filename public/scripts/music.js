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

  let streams = [];
  let currentTrackIndex = 0;

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
      trackCard.innerHTML = `<img src="${track.img}" alt="${track.title}" /><span>${track.title}</span>`;
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
