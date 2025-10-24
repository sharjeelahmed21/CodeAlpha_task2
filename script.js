const songs = [
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    src: "videoplayback1.m4a",
    cover: "images (1).jpg"
  },
  {
    title: "See You Again",
    artist: "Wiz Khalifa",
    src: "videoplayback.m4a",
    cover: "images.jpg"
  },
  {
    title: "Shape Of You",
    artist: "Ed Sheeran",
    src: "videoplayback2.m4a",
    cover: "images 2.jpg"
  }
];

let currentSong = 0;
let isPlaying = false;
let autoplay = true;

const audio = new Audio();
const playerContainer = document.querySelector(".player-container");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

// Load playlist
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} — ${song.artist}`;
  li.addEventListener("click", () => loadSong(index, true));
  playlistEl.appendChild(li);
});

function loadSong(index, playNow = false) {
  currentSong = index;
  const song = songs[index];
  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;

  document.querySelectorAll("#playlist li").forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });

  if (playNow) playSong();
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸️";
  playerContainer.classList.add("playing");
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶️";
  playerContainer.classList.remove("playing");
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", nextSong);
function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong, true);
}

prevBtn.addEventListener("click", prevSong);
function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong, true);
}

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60)
      .toString()
      .padStart(2, "0");
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60)
      .toString()
      .padStart(2, "0");
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
  }
});

progressBar.addEventListener("click", (e) => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

audio.addEventListener("ended", () => {
  if (autoplay) nextSong();
});

loadSong(0);
