/* =========================================================
   VERSI CETAK / PDF
   Membuat blok .print-only yang hanya tampil saat halaman dicetak
   (lihat assets/css/cetak.css). Bagian interaktif (lambang, panel peta,
   kuis) diganti versi statis di sini. Dimuat setelah app.js karena
   memakai DATA, UNSUR, WARNA, KUIS, esc, dan nm.
   ========================================================= */
(() => {
  const tanggal = new Date().toLocaleDateString("id-ID", {day:"numeric", month:"long", year:"numeric"});
  const sisipSetelah = (el, html) => el.insertAdjacentHTML("afterend", `<div class="print-only">${html}</div>`);

  /* ---------- Sampul: daftar isi dan tanggal data ---------- */
  const isi = [...document.querySelectorAll(".nav a")].map(a => {
    const [no, ...judul] = a.textContent.split(" ");
    return `<li><span>${esc(no)}</span>${esc(judul.join(" "))}</li>`;
  }).join("");
  sisipSetelah(document.querySelector(".hero-aside"),
    `<div class="sampul-isi"><h2>Isi materi</h2><ol>${isi}</ol><p>Data pengurus per ${tanggal}.</p></div>`);

  /* ---------- IV Makna lambang ---------- */
  const kata = tiles => `<dl class="kata">${tiles.map(([w, a]) => `<dt>${w}</dt><dd>${a}</dd>`).join("")}</dl>`;
  sisipSetelah(document.querySelector(".lambang"), `<div class="unsur-cetak">${UNSUR.map(u =>
    `<div class="kartu"><h4>${u.t}</h4>${u.h}${u.tiles ? kata(u.tiles) : ""}${u.after || ""}${u.warna ? WARNA : ""}</div>`
  ).join("")}</div>`);

  /* ---------- VI Ketua Karang Taruna se-Pasar Rebo ---------- */
  const baris = (jabatan, nama) => `<tr><th>${jabatan}</th><td>${nm(nama)}</td></tr>`;
  sisipSetelah(document.querySelector("#pasarrebo .peta"),
    `<table class="tbl"><thead><tr><th>Jabatan</th><th>Nama</th></tr></thead><tbody>
      ${baris("Ketua Karang Taruna Kecamatan Pasar Rebo", DATA.kecamatan.ketuaKartar)}
      ${Object.entries(DATA.kelurahan).map(([k, kel]) =>
        baris(`Ketua Karang Taruna Kelurahan ${kel.nama}${k === "kalisari" ? " (kelurahan kita)" : ""}`, kel.ketuaKartar)).join("")}
    </tbody></table>`);

  /* ---------- VII Pengurus per RW dan daftar Ketua RT ---------- */
  const rwKeys = Object.keys(DATA.rw).sort();
  const nomorRT = i => String(i + 1).padStart(3, "0");
  sisipSetelah(document.querySelector("#kalisari .peta"),
    `<h3>Pengurus per RW</h3>
    <table class="tbl rw"><thead><tr><th>RW</th><th>Ketua RW</th><th>LMK</th><th>Ketua Karang Taruna Unit</th><th>RT</th></tr></thead><tbody>
      ${rwKeys.map(k => { const r = DATA.rw[k]; return `<tr><th>${k}</th>
        <td>${nm(r.ketuaRW)}${r.plt ? " (Plt)" : ""}</td><td>${nm(r.lmk)}</td>
        <td>${r.adaUnit === false ? '<span class="kosong">Belum ada unit</span>' : nm(r.ketuaKartar)}</td>
        <td>${r.rt.length}</td></tr>`; }).join("")}
    </tbody></table>
    <h3>Daftar Ketua RT</h3>
    <div class="rt-grid">${rwKeys.map(k => { const r = DATA.rw[k]; return `<div class="rt-rw">
      <h4>RW ${k} <span>${r.rt.length} RT</span></h4>${r.catatan ? `<p class="catat">${esc(r.catatan)}</p>` : ""}
      <ol>${r.rt.map((n, i) => `<li><span>RT ${nomorRT(i)}</span>${esc(n)}</li>`).join("")}</ol></div>`; }).join("")}
    </div>`);

  /* ---------- VIII Kuis dan kunci jawaban ---------- */
  const huruf = "abcd";
  sisipSetelah(document.getElementById("kuisBox"),
    `<ol class="kuis-cetak">${KUIS.map(q =>
      `<li><p>${q.q}</p><ol type="a">${q.o.map(o => `<li>${o}</li>`).join("")}</ol></li>`).join("")}</ol>
    <div class="kunci"><h3>Kunci jawaban</h3><ol>${KUIS.map(q =>
      `<li><b>${huruf[q.a]}. ${q.o[q.a]}</b>. ${q.e}</li>`).join("")}</ol></div>`);
})();
