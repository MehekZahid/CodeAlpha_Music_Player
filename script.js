const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progressBar");
const volumeSlider = document.getElementById("volume");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const trackNameEl = document.getElementById("trackName");
const trackArtistEl = document.getElementById("trackArtist");
const trackImageEl = document.getElementById("trackImage");
const songListEl = document.getElementById("songList");
const trackIndexEl = document.getElementById("trackIndex");
const playIcon = document.getElementById("play-icon");
const searchInput = document.getElementById("searchInput"); // <-- Search input element

const songs = [
  { name: "1 : Uska he banana", artist: "1920 Evil Returns", src: "songs/song1.mp3", img: "images/image3.jpeg", duration: "5:47" },
  { name: "13 : Phir na aesi raat ayegi", artist: "Laal singh chadda", src: "songs/song11.mp3", img: "images/image11.jpeg", duration: "5:13" },
  { name: "3 : Ap Nazar Aye", artist: "Bada naam karenge", src: "songs/song3.mp3", img: "images/image1.jpeg", duration: "3:07" },
  { name: "4 : Apna bana le", artist: "Bhediya", src: "songs/song4.mp3", img: "images/image4.jpeg", duration: "3:24" },
  { name: "5 : Dekha hazaron dafa", artist: "Rustom", src: "songs/song5.mp3", img: "images/image5.jpeg", duration: "3:34" },
  { name: "6 : Dhadak Title Track", artist: "Dhadak", src: "songs/song6.mp3", img: "images/image6.jpeg", duration: "3:35" },
  { name: "7 : Dil ka telephone", artist: "Dream girl", src: "songs/song7.mp3", img: "images/image7.jpeg", duration: "3:07" },
  { name: "8 : Ik Mulaqaat", artist: "Dream girl", src: "songs/song8.mp3", img: "images/image8.jpeg", duration: "3:09" },
  { name: "9 : Jitni Dafa", artist: "Parmanu", src: "songs/song9.mp3", img: "images/image9.jpeg", duration: "3:32" },
  { name: "10 : Kalank Title Track", artist: "Kalank", src: "songs/song10.mp3", img: "images/image10.jpeg", duration: "3:00" },
  { name: "11 : Ilzam", artist: "Jewel Thief the Heist Begins", src: "songs/song2.mp3", img: "images/image2.jpeg", duration: "2:26" },
  { name: "12 : Tu Hain Toh Main Hoon", artist: "Sky Force", src: "songs/song12.mp3", img: "images/image12.jpeg", duration: "2:45" },
  { name: "13 : Ve Maahi", artist: "Kesari", src: "songs/song13.mp3", img: "images/image13.jpeg", duration: "3:54" },
  { name: "14 : Tere Bina Na Guzara Ay", artist: "Punjabi Song", src: "songs/song14.mp3", img: "images/image14.jpeg", duration: "1:48" },
  { name: "15 : Teri Khair Mangdi", artist: "Baar Baar Dekho", src: "songs/song15.mp3", img: "images/image15.jpeg", duration: "3:57" },
  { name: "16 : Sukoon Mila", artist: "Mary Kom", src: "songs/song16.mp3", img: "images/image16.jpeg", duration: "3:53" },
  { name: "17 : Sweetheart", artist: "Kedarnath", src: "songs/song17.mp3", img: "images/image17.jpeg", duration: "3:42" },
  { name: "18 : Tenu Khabar Nahi", artist: "Munjya", src: "songs/song18.mp3", img: "images/image18.jpeg", duration: "2:38" },
  { name: "19 : Teri Meri Kahani", artist: "Gabbar Is Back", src: "songs/song19.mp3", img: "images/image19.jpeg", duration: "5:34" },
  { name: "20 : Zaalima", artist: "Raees", src: "songs/song20.mp3", img: "images/image20.jpeg", duration: "5:06" },
  { name: "21 : Tu Itni Khubsurat Hai", artist: "Barkhaa", src: "songs/song21.mp3", img: "images/image21.jpeg", duration: "4:20" },
  { name: "22 : Udi Udi Jaye", artist: "Raees", src: "songs/song22.mp3", img: "images/image20.jpeg", duration: "2:30" },
  { name: "22 : Udi Udi Jaye", artist: "Raees", src: "songs/song22.mp3", img: "images/image20.jpeg", duration: "2:30" },
  
];

let currentTrack = 0;
let isPlaying = false;

function loadTrack(index) {
  const song = songs[index];
  trackNameEl.textContent = song.name;
  trackArtistEl.textContent = song.artist;
  trackImageEl.src = song.img;
  audio.src = song.src;

  [...songListEl.children].forEach(li => li.classList.remove("active"));
  if (songListEl.children[index]) {
    songListEl.children[index].classList.add("active");
  }
}

function playTrack() {
  audio.play();
  isPlaying = true;
  playIcon.src = "images/pause.png";
}

function pauseTrack() {
  audio.pause();
  isPlaying = false;
  playIcon.src = "images/play.png";
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playTrack();
  } else {
    pauseTrack();
  }
});

prevBtn.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + songs.length) % songs.length;
  loadTrack(currentTrack);
  playTrack();
});

nextBtn.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % songs.length;
  loadTrack(currentTrack);
  playTrack();
});

audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;
  progressBar.value = (currentTime / duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
});

progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

audio.addEventListener("ended", () => {
  nextBtn.click();
});

function formatTime(time) {
  const minutes = Math.floor(time / 60) || 0;
  const seconds = Math.floor(time % 60) || 0;
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

function generatePlaylist(filter = "") {
  songListEl.innerHTML = "";
  songs.forEach((song, index) => {
    const lowerName = song.name.toLowerCase();
    const lowerArtist = song.artist.toLowerCase();
    const lowerFilter = filter.toLowerCase();
    if (lowerName.includes(lowerFilter) || lowerArtist.includes(lowerFilter)) {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${song.name}</span>
        <span style="float: right; opacity: 0.7;">${song.duration}</span>
      `;
      li.addEventListener("click", () => {
        currentTrack = index;
        loadTrack(currentTrack);
        playTrack();
      });
      songListEl.appendChild(li);
    }
  });
}

// 👇 Filter on input
searchInput.addEventListener("input", () => {
  generatePlaylist(searchInput.value);
});

generatePlaylist();
loadTrack(currentTrack);
