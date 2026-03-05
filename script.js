// ===================== DATA JADWAL =====================
const jadwalMingguan = {
  "Minggu 1": ["MANAJEMEN PROYEK INFORMATIKA – Pert. 1","TESTING DAN QA PERANGKAT LUNAK – Pert. 1","ARSITEKTUR DAN ORGANISASI KOMPUTER – Pert. 1","ETIKA PROFESI – Pert. 1"],
  "Minggu 2": ["MANAJEMEN PROYEK INFORMATIKA – Pert. 2","TESTING DAN QA PERANGKAT LUNAK – Pert. 2","ARSITEKTUR DAN ORGANISASI KOMPUTER – Pert. 2-3","ETIKA PROFESI – Pert. 2","PEMROGRAMAN WEB II – Pert. 3"],
  "Minggu 3": ["MANAJEMEN PROYEK INFORMATIKA – Pert. 3","TESTING DAN QA PERANGKAT LUNAK – Pert. 3","ARSITEKTUR DAN ORGANISASI KOMPUTER – Pert. 4","ETIKA PROFESI – Pert. 3"],
  "Minggu 4": ["MANAJEMEN PROYEK INFORMATIKA – Pert. 4","TESTING DAN QA PERANGKAT LUNAK – Pert. 4","ARSITEKTUR DAN ORGANISASI KOMPUTER – Pert. 5-6","ETIKA PROFESI – Pert. 4","PEMROGRAMAN WEB II – Pert. 6"],
  "Minggu 5": ["MANAJEMEN PROYEK INFORMATIKA – Pert. 5","TESTING DAN QA PERANGKAT LUNAK – Pert. 5","ARSITEKTUR DAN ORGANISASI KOMPUTER – Pert. 7","ETIKA PROFESI – Pert. 5"],
  "Minggu 6": ["MANAJEMEN PROYEK INFORMATIKA – Pert. 6","TESTING DAN QA PERANGKAT LUNAK – Pert. 6","ARSITEKTUR DAN ORGANISASI KOMPUTER – Pert. 8-9","ETIKA PROFESI – Pert. 6","PEMROGRAMAN WEB II – Pert. 9"],
  "Minggu 7": ["MANAJEMEN PROYEK INFORMATIKA – Pert. 7","TESTING DAN QA PERANGKAT LUNAK – Pert. 7","ARSITEKTUR DAN ORGANISASI KOMPUTER – Pert. 10","ETIKA PROFESI – Pert. 7"],
  "Minggu UTS": ["MANAJEMEN PROYEK INFORMATIKA","TESTING DAN QA PERANGKAT LUNAK","ARSITEKTUR DAN ORGANISASI KOMPUTER ","ETIKA PROFESI"],
  "Minggu 9": ["JARINGAN NIRKABEL – Pert. 8","KEAMANAN KOMPUTER – Pert. 8","KECAKAPAN ANTAR PERSONAL – Pert. 8","PEMROGRAMAN WEB II – Pert. 11-12","ARSITEKTUR DAN ORGANISASI KOMPUTER – Pert. 12"],
  "Minggu 10": ["JARINGAN NIRKABEL – Pert. 9","KEAMANAN KOMPUTER – Pert. 9","KECAKAPAN ANTAR PERSONAL – Pert. 9","PEMROGRAMAN WEB II - Pert. 13"],
  "Minggu 11": ["JARINGAN NIRKABEL – Pert. 10","KEAMANAN KOMPUTER – Pert. 10","KECAKAPAN ANTAR PERSONAL – Pert. 10","PEMROGRAMAN WEB II – Pert. 14-15","ARSITEKTUR DAN ORGANISASI KOMPUTER – Pert. 15"],
  "Minggu 12": ["JARINGAN NIRKABEL – Pert. 11","KEAMANAN KOMPUTER – Pert. 11","KECAKAPAN ANTAR PERSONAL – Pert. 11","PEMROGRAMAN WEB II - Pert. 16"],
  "Minggu 13": ["JARINGAN NIRKABEL – Pert. 12","KEAMANAN KOMPUTER – Pert. 12","KECAKAPAN ANTAR PERSONAL – Pert. 12","PEMROGRAMAN WEB II – Pert. 17-18","ARSITEKTUR DAN ORGANISASI KOMPUTER – Pert. 18"],
  "Minggu 14": ["JARINGAN NIRKABEL – Pert. 13","KEAMANAN KOMPUTER – Pert. 13","KECAKAPAN ANTAR PERSONAL – Pert. 13","PEMROGRAMAN WEB II - Pert. 19"],
  "Minggu 15": ["JARINGAN NIRKABEL – Pert. 14","KEAMANAN KOMPUTER – Pert. 14","KECAKAPAN ANTAR PERSONAL – Pert. 14","PEMROGRAMAN WEB II – Pert. 20-21","ARSITEKTUR DAN ORGANISASI KOMPUTER – Pert. 21"],
  "Minggu UAS": ["JARINGAN NIRKABEL","KEAMANAN KOMPUTER","KECAKAPAN ANTAR PERSONAL ","ETIKA PROFESI"],
};

// ===================== DOM ELEMENTS =====================
const mingguContainer = document.getElementById("mingguContainer");
const jadwalDiv = document.getElementById("jadwalMinggu");
const btnToday = document.getElementById("btnToday");
const btnReset = document.getElementById("btnReset");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

// ===================== JAM & HARI =====================
function updateClock() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = now.toLocaleDateString('id-ID', options);
  const time = now.toLocaleTimeString('id-ID', { hour12: false });
  const el = document.getElementById("clock");
  if (el) el.textContent = `${date} | ${time}`;
}
setInterval(updateClock, 1000);
updateClock();

// ===================== PROGRESS LOCAL STORAGE =====================
function getSavedProgress() {
  try { return JSON.parse(localStorage.getItem("progressJadwal")) || {}; }
  catch { return {}; }
}
function saveProgress(progress) {
  localStorage.setItem("progressJadwal", JSON.stringify(progress));
}

// ===================== BUAT TOMBOL MINGGU =====================
const mingguKeys = Object.keys(jadwalMingguan);
mingguKeys.forEach((minggu, index) => {
  const btn = document.createElement("div");
  btn.classList.add("minggu");
  btn.textContent = minggu;
  btn.addEventListener("click", () => {
    highlightMinggu(index);
    tampilkanJadwal(minggu);
  });
  mingguContainer.appendChild(btn);
});

// ===================== HITUNG MINGGU SEKARANG =====================
const tanggalMulai = new Date("2026-03-02");
function getMingguIndexHariIni() {
  const hariIni = new Date();
  const selisihHari = Math.floor((hariIni - tanggalMulai) / (1000*60*60*24));
  let idx = Math.ceil(selisihHari / 7) - 1;
  if (idx < 0) idx = 0;
  if (idx > mingguKeys.length - 1) idx = mingguKeys.length - 1; // ✔ perbaikan batas
  return idx;
}
let mingguKe = getMingguIndexHariIni();
highlightMinggu(mingguKe);
tampilkanJadwal(mingguKeys[mingguKe]);

// ===================== HIGHLIGHT MINGGU =====================
function highlightMinggu(idx){
  const semuaMinggu = document.querySelectorAll(".minggu");
  semuaMinggu.forEach(m => m.classList.remove("active"));
  if (semuaMinggu[idx]) semuaMinggu[idx].classList.add("active");
}

// ===================== TAMPILKAN JADWAL DENGAN FADE =====================
function tampilkanJadwal(minggu){
  const kegiatan = jadwalMingguan[minggu] || [];
  const progress = getSavedProgress();

  jadwalDiv.classList.add("fade-out");
  setTimeout(() => {
    jadwalDiv.innerHTML = `<h2>${minggu}</h2><ul>${
      kegiatan.map((kegiatanItem, idx) => {
        const key = `${minggu}-${idx}`;
        const completedClass = progress[key] ? "completed" : "";
        return `<li data-key="${key}" class="${completedClass}">${kegiatanItem}</li>`;
      }).join("")
    }</ul>`;

    jadwalDiv.classList.remove("fade-out");
    updateProgressBar();

    document.querySelectorAll("#jadwalMinggu ul li").forEach(li => {
      li.addEventListener("click", () => {
        const key = li.getAttribute("data-key");
        const progressData = getSavedProgress();
        if (progressData[key]) {
          delete progressData[key];
          li.classList.remove("completed");
        } else {
          progressData[key] = true;
          li.classList.add("completed");
        }
        saveProgress(progressData);
        updateProgressBar();
      });
    });
  }, 800);
}

// ===================== PROGRESS BAR =====================
function updateProgressBar() {
  const active = document.querySelector(".minggu.active");
  if (!active) return;
  const currentWeek = active.textContent;

  const totalItems = (jadwalMingguan[currentWeek] || []).length;
  const progress = getSavedProgress();

  // ✔ prefix yang spesifik untuk minggu ini
  const prefix = `${currentWeek}-`;
  const completed = Object.keys(progress).filter(key => key.startsWith(prefix)).length;

  const percent = totalItems > 0 ? Math.round((completed / totalItems) * 100) : 0;
  progressFill.style.width = `${percent}%`;
  progressText.textContent = `Progress Minggu Ini: ${completed}/${totalItems} (${percent}%)`;
}

// ===================== EVENT BUTTON =====================
btnToday.addEventListener("click", () => {
  mingguKe = getMingguIndexHariIni(); // hitung ulang dinamis
  highlightMinggu(mingguKe);
  tampilkanJadwal(mingguKeys[mingguKe]);
});

btnReset.addEventListener("click", () => {
  localStorage.removeItem("progressJadwal");
  tampilkanJadwal(mingguKeys[getMingguIndexHariIni()]);
  alert("Progress berhasil di-reset!");
});



