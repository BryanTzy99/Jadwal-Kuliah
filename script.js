// ===================== DATA JADWAL =====================
const jadwalMingguan = {
  "Minggu 1": ["Kerja Praktek – Pert. 1","Teknologi Internet of Things – Pert. 1","Basis Data II – Pert. 1","Mobile Programming – Pert. 1"],
  "Minggu 2": ["Kerja Praktek – Pert. 2","Teknologi Internet of Things – Pert. 2","Basis Data II – Pert. 2-3","Mobile Programming – Pert. 2-3","Rekayasa Perangkat Lunak – Pert. 3","Pemrograman II – Pert. 3"],
  "Minggu 3": ["Kerja Praktek – Pert. 3","Teknologi Internet of Things – Pert. 3","Basis Data II – Pert. 4","Mobile Programming – Pert. 4"],
  "Minggu 4": ["Kerja Praktek – Pert. 4","Teknologi Internet of Things – Pert. 4","Basis Data II – Pert. 5-6","Mobile Programming – Pert. 5-6","Rekayasa Perangkat Lunak – Pert. 6","Pemrograman II – Pert. 6"],
  "Minggu 5": ["Kerja Praktek – Pert. 5","Teknologi Internet of Things – Pert. 5","Basis Data II – Pert. 7","Mobile Programming – Pert. 7"],
  "Minggu 6": ["Kerja Praktek – Pert. 6","Teknologi Internet of Things – Pert. 6","Basis Data II – Pert. 8-9","Mobile Programming – Pert. 8-9","Rekayasa Perangkat Lunak – Pert. 9","Pemrograman II – Pert. 9"],
  "Minggu 7": ["Kerja Praktek – Pert. 7","Teknologi Internet of Things – Pert. 7","Basis Data II – Pert. 10","Mobile Programming – Pert. 10"],
  "Minggu UAS : ["Sistem Penunjang Keputusan","Teknik Kompilasi","Pemrograman II","Rekayasa Perangkat Lunak"],
  "Minggu 8": ["Sistem Penunjang Keputusan – Pert. 8","Teknik Kompilasi – Pert. 8","Pemrograman II – Pert. 11-12","Rekayasa Perangkat Lunak – Pert. 11-12","Mobile Programing – Pert. 12","Basis Data II – Pert. 12"],
  "Minggu 9": ["Sistem Penunjang Keputusan – Pert. 9","Teknik Kompilasi – Pert. 9","Pemrograman II – Pert. 13","Rekayasa Perangkat Lunak - Pert. 13 "],
  "Minggu 10": ["Sistem Penunjang Keputusan – Pert. 10","Teknik Kompilasi – Pert. 10","Pemrograman II – Pert. 14-15","Rekayasa Perangkat Lunak – Pert. 14-15","Mobile Programing – Pert. 15","Basis Data II – Pert. 15"],
  "Minggu 11": ["Sistem Penunjang Keputusan – Pert. 11","Teknik Kompilasi – Pert. 11","Pemrograman II – Pert. 16","Rekayasa Perangkat Lunak - Pert. 16 "],
  "Minggu 12": ["Sistem Penunjang Keputusan – Pert. 12","Teknik Kompilasi – Pert. 12","Pemrograman II – Pert. 17-18","Rekayasa Perangkat Lunak – Pert. 17-18","Mobile Programing – Pert. 18","Basis Data II – Pert. 18"],
  "Minggu 13": ["Sistem Penunjang Keputusan – Pert. 13","Teknik Kompilasi – Pert. 13","Pemrograman II – Pert. 19","Rekayasa Perangkat Lunak - Pert. 19 "],
  "Minggu 14": ["Sistem Penunjang Keputusan – Pert. 14","Teknik Kompilasi – Pert. 14","Pemrograman II – Pert. 20-21","Rekayasa Perangkat Lunak – Pert. 20-21","Mobile Programing – Pert. 21","Basis Data II – Pert. 21"],
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
  document.getElementById("clock").textContent = `${date} | ${time}`;
}
setInterval(updateClock, 1000);
updateClock();

// ===================== PROGRESS LOCAL STORAGE =====================
function getSavedProgress() {
  return JSON.parse(localStorage.getItem("progressJadwal")) || {};
}

function saveProgress(progress) {
  localStorage.setItem("progressJadwal", JSON.stringify(progress));
}

// ===================== BUAT TOMBOL MINGGU =====================
Object.keys(jadwalMingguan).forEach((minggu, index) => {
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
const hariIni = new Date();
const selisihHari = Math.floor((hariIni - tanggalMulai) / (1000*60*60*24));
let mingguKe = Math.ceil(selisihHari / 7) - 1;
if(mingguKe > 13) mingguKe = 13;
if(mingguKe < 0) mingguKe = 0;

highlightMinggu(mingguKe);
const mingguSekarang = Object.keys(jadwalMingguan)[mingguKe];
tampilkanJadwal(mingguSekarang);

// ===================== HIGHLIGHT MINGGU =====================
function highlightMinggu(idx){
  const semuaMinggu = document.querySelectorAll(".minggu");
  semuaMinggu.forEach(m => m.classList.remove("active"));
  if(semuaMinggu[idx]) semuaMinggu[idx].classList.add("active");
}

// ===================== TAMPILKAN JADWAL DENGAN FADE =====================
function tampilkanJadwal(minggu){
  const kegiatan = jadwalMingguan[minggu];
  const progress = getSavedProgress();

  // Fade-out mulai
  jadwalDiv.classList.add("fade-out");

  // Tunggu 800ms sebelum ganti konten (fade-out lambat)
  setTimeout(() => {
    jadwalDiv.innerHTML = `<h2>${minggu}</h2><ul>${
      kegiatan.map((kegiatanItem, idx) => {
        const key = `${minggu}-${idx}`;
        const completedClass = progress[key] ? "completed" : "";
        return `<li data-key="${key}" class="${completedClass}">${kegiatanItem}</li>`;
      }).join("")
    }</ul>`;

    // Fade-in otomatis setelah konten baru dimasukkan
    jadwalDiv.classList.remove("fade-out");

    updateProgressBar();

    // Klik checklist mata kuliah
    document.querySelectorAll("#jadwalMinggu ul li").forEach(li => {
      li.addEventListener("click", () => {
        const key = li.getAttribute("data-key");
        const progressData = getSavedProgress();
        if(progressData[key]) {
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
  }, 800); // Fade-out dan fade-in total 0.8 detik
}

// ===================== PROGRESS BAR =====================
function updateProgressBar() {
  const currentWeek = document.querySelector(".minggu.active").textContent;
  const totalItems = jadwalMingguan[currentWeek].length;
  const progress = getSavedProgress();
  const completed = Object.keys(progress).filter(key => key.startsWith(currentWeek)).length;
  
  const percent = Math.round((completed / totalItems) * 100);
  progressFill.style.width = `${percent}%`;
  progressText.textContent = `Progress Minggu Ini: ${completed}/${totalItems} (${percent}%)`;
}

// ===================== EVENT BUTTON =====================
btnToday.addEventListener("click", () => {
  highlightMinggu(mingguKe);
  tampilkanJadwal(mingguSekarang);
});

btnReset.addEventListener("click", () => {
  localStorage.removeItem("progressJadwal");
  tampilkanJadwal(Object.keys(jadwalMingguan)[mingguKe]);
  alert("Progress berhasil di-reset!");
});




