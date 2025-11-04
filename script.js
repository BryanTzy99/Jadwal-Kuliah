// ===================== DATA JADWAL =====================
const jadwalMingguan = {
  "Minggu 1": ["Kerja Praktek – Pert. 1","Teknologi Internet of Things – Pert. 1","Basis Data II – Pert. 1","Mobile Programming – Pert. 1"],
  "Minggu 2": ["Kerja Praktek – Pert. 2","Teknologi Internet of Things – Pert. 2","Basis Data II – Pert. 2-3","Mobile Programming – Pert. 2-3","Rekayasa Perangkat Lunak – Pert. 3","Pemrograman II – Pert. 3"],
  "Minggu 3": ["Kerja Praktek – Pert. 3","Teknologi Internet of Things – Pert. 3","Basis Data II – Pert. 4","Mobile Programming – Pert. 4"],
  "Minggu 4": ["Kerja Praktek – Pert. 4","Teknologi Internet of Things – Pert. 4","Basis Data II – Pert. 5-6","Mobile Programming – Pert. 5-6","Rekayasa Perangkat Lunak – Pert. 6","Pemrograman II – Pert. 6"],
  "Minggu 5": ["Kerja Praktek – Pert. 5","Teknologi Internet of Things – Pert. 5","Basis Data II – Pert. 7","Mobile Programming – Pert. 7"],
  "Minggu 6": ["Kerja Praktek – Pert. 6","Teknologi Internet of Things – Pert. 6","Basis Data II – Pert. 8-9","Mobile Programming – Pert. 8-9","Rekayasa Perangkat Lunak – Pert. 9","Pemrograman II – Pert. 9"],
  "Minggu 7": ["Kerja Praktek – Pert. 7","Teknologi Internet of Things – Pert. 7","Basis Data II – Pert. 10","Mobile Programming – Pert. 10"],
  "Minggu UAS": ["Sistem Penunjang Keputusan","Teknik Kompilasi","Pemrograman II","Rekayasa Perangkat Lunak"],
  "Minggu 9": ["Sistem Penunjang Keputusan – Pert. 8","Teknik Kompilasi – Pert. 8","Pemrograman II – Pert. 11-12","Rekayasa Perangkat Lunak – Pert. 11-12","Mobile Programming – Pert. 12","Basis Data II – Pert. 12"],
  "Minggu 10": ["Sistem Penunjang Keputusan – Pert. 9","Teknik Kompilasi – Pert. 9","Pemrograman II – Pert. 13","Rekayasa Perangkat Lunak - Pert. 13"],
  "Minggu 11": ["Sistem Penunjang Keputusan – Pert. 10","Teknik Kompilasi – Pert. 10","Pemrograman II – Pert. 14-15","Rekayasa Perangkat Lunak – Pert. 14-15","Mobile Programming – Pert. 15","Basis Data II – Pert. 15"],
  "Minggu 12": ["Sistem Penunjang Keputusan – Pert. 11","Teknik Kompilasi – Pert. 11","Pemrograman II – Pert. 16","Rekayasa Perangkat Lunak - Pert. 16"],
  "Minggu 13": ["Sistem Penunjang Keputusan – Pert. 12","Teknik Kompilasi – Pert. 12","Pemrograman II – Pert. 17-18","Rekayasa Perangkat Lunak – Pert. 17-18","Mobile Programming – Pert. 18","Basis Data II – Pert. 18"],
  "Minggu 14": ["Sistem Penunjang Keputusan – Pert. 13","Teknik Kompilasi – Pert. 13","Pemrograman II – Pert. 19","Rekayasa Perangkat Lunak - Pert. 19"],
  "Minggu 15": ["Sistem Penunjang Keputusan – Pert. 14","Teknik Kompilasi – Pert. 14","Pemrograman II – Pert. 20-21","Rekayasa Perangkat Lunak – Pert. 20-21","Mobile Programming – Pert. 21","Basis Data II – Pert. 21"],
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
const tanggalMulai = new Date("2025-09-08");
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

