// Array Teks untuk Tombol Banner yang Berubah Setiap 3 Detik
const bannerTexts = [
  "DOWNLOAD MP3 BUAT JJ",
  "NO IKLAN",
  "KLIK DI SINI MP3 JJ",
  "DOWNLOAD AUDIO TIKTOK FREE",
  "JJ BASS FULL MP3"
];

let textIndex = 0;
const bannerBtn = document.getElementById("banner-btn");
const bannerVideo = document.getElementById("banner-video");

// Loop Teks Setiap 3 Detik
setInterval(() => {
  textIndex = (textIndex + 1) % bannerTexts.length;
  bannerBtn.textContent = bannerTexts[textIndex];
}, 3000);

// Play Video Banner Saat Ditekan/Dihover
bannerBtn.addEventListener("click", () => {
  if (bannerVideo.paused) {
    bannerVideo.play();
  } else {
    bannerVideo.pause();
  }
});

// Integrasi API tikwm.com
async function fetchAudio() {
  const urlInput = document.getElementById("tiktok-url").value.trim();
  const resultContainer = document.getElementById("result-container");
  const loading = document.getElementById("loading");
  const audioResult = document.getElementById("audio-result");

  if (!urlInput) {
    alert("Silakan masukkan URL TikTok terlebih dahulu!");
    return;
  }

  resultContainer.classList.remove("hidden");
  loading.classList.remove("hidden");
  audioResult.classList.add("hidden");

  try {
    const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(urlInput)}`);
    const resData = await response.json();

    if (resData.code === 0 && resData.data) {
      const data = resData.data;

      // Update data audio sesuai URL
      document.getElementById("music-cover").src = data.music_info.cover || data.cover;
      document.getElementById("music-title").textContent = data.music_info.title || "Audio TikTok";
      document.getElementById("music-author").textContent = `By: ${data.music_info.author || data.author.nickname}`;
      
      const downloadLink = document.getElementById("audio-download-link");
      downloadLink.href = data.music || data.music_info.play;

      loading.classList.add("hidden");
      audioResult.classList.remove("hidden");
    } else {
      alert("Gagal mengambil audio. Pastikan URL TikTok valid.");
      resultContainer.classList.add("hidden");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan koneksi ke API.");
    resultContainer.classList.add("hidden");
  }
}
