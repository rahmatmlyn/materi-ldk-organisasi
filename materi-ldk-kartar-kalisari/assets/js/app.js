const SVGNS = "http://www.w3.org/2000/svg";
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const nm = v => v && v.trim() ? esc(v) : '<span class="kosong">Belum diisi</span>';
const ini = v => v && v.trim() ? v.trim().split(/\s+/).filter(w=>/^[A-Za-z]/.test(w)).slice(0,2).map(w=>w[0]).join("").toUpperCase() : "?";
function person(role, val, desc, cls){
  return `<li><div class="av ${cls||""}" aria-hidden="true">${ini(val)}</div><div><div class="role">${role}</div><div class="name">${nm(val)}</div>${desc?`<div class="desc">${desc}</div>`:""}</div></li>`;
}

/* ---------- Lambang ---------- */
const UNSUR = [
  {t:"Bunga teratai mulai mekar", h:`<p>Melambangkan unsur remaja yang dijiwai semangat kemasyarakatan (sosial).</p>`},
  {t:"Empat daun bagian bawah", h:`<p>Melambangkan empat fungsi Karang Taruna:</p><ol><li>Memupuk kreativitas untuk belajar bertanggung jawab.</li><li>Membina kegiatan sosial, rekreatif, edukatif, ekonomis produktif, dan kegiatan praktis lainnya.</li><li>Mengembangkan harapan dan cita-cita anak dan remaja melalui bimbingan individual maupun kelompok.</li><li>Menanamkan penghayatan dan pengamalan Pancasila.</li></ol>`},
  {t:"Tujuh daun bagian atas", h:`<p>Melambangkan tujuh unsur kepribadian yang harus dimiliki anak dan remaja. Ketuk tiap kata untuk melihat artinya.</p>`, tiles:[
    ["Taat","Takwa kepada Tuhan Yang Maha Esa"],["Tanggap","Penuh perhatian dan peka terhadap masalah"],["Tanggon","Kuat, daya tahan fisik dan mental"],["Tandas","Tegas, pasti, tidak ragu, teguh pendirian"],["Tangkas","Sigap, gesit, cepat bergerak, dinamis"],["Trampil","Mampu berkreasi dan berkarya praktis"],["Tulus","Sederhana, ikhlas, rela memberi, jujur"]]},
  {t:"Pita bawah: Karang Taruna", h:`<p>Karang = pekarangan, halaman, atau tempat. Taruna = remaja.</p><p>Secara keseluruhan berarti <b>tempat atau wadah pembinaan remaja</b>.</p>`},
  {t:"Pita atas: Aditya Karya Mahatva Yodha", h:`<p>Ketuk tiap kata untuk melihat artinya.</p>`, after:`<p style="margin-top:16px">Secara keseluruhan berarti <b>pejuang yang berkepribadian, berpengetahuan, dan terampil</b>.</p>`, tiles:[
    ["Aditya","Cerdas, penuh pengalaman"],["Karya","Pekerjaan"],["Mahatva","Terhormat, berbudi luhur"],["Yodha","Pejuang, patriot"]]},
  {t:"Lingkaran", h:`<p>Melambangkan sebuah tameng, sebagai lambang <b>Ketahanan Nasional</b>.</p>`},
  {t:"Teratai mekar lima daun", h:`<p>Melambangkan lingkungan kehidupan masyarakat yang sejahtera merata berlandaskan Pancasila.</p>`},
  {t:"Arti warna", h:``, warna:true}
];
const ul = document.getElementById("unsurList"), det = document.getElementById("unsurDetail");
function showUnsur(i){
  [...ul.querySelectorAll("button")].forEach((b,j)=>{b.setAttribute("aria-selected", j===i); b.tabIndex = j===i?0:-1;});
  const u = UNSUR[i];
  let html = `<h3>${u.t}</h3>${u.h}`;
  if(u.tiles){ html += `<div class="tiles">${u.tiles.map(([w,a])=>`<button class="tile" aria-expanded="false"><strong>${w}</strong><span class="hint">Ketuk untuk arti</span><span class="hid">${a}</span></button>`).join("")}</div>`; }
  if(u.after) html += u.after;
  if(u.warna){ html += `<div class="swatch"><div class="sw-putih"><b>Putih</b>Kesucian, tidak tercela, tidak ternoda</div><div class="sw-merah"><b>Merah</b>Keberanian, sabar, tenang, dapat mengendalikan diri, tekad pantang mundur</div><div class="sw-kuning"><b>Kuning</b>Keagungan atas keluhuran budi pekerti</div></div>`; }
  det.innerHTML = html;
  det.querySelectorAll(".tile").forEach(t=>t.addEventListener("click",()=>t.setAttribute("aria-expanded", t.getAttribute("aria-expanded")!=="true")));
}
UNSUR.forEach((u,i)=>{
  const li=document.createElement("li"), b=document.createElement("button");
  b.setAttribute("role","tab"); b.textContent=u.t; b.addEventListener("click",()=>showUnsur(i));
  b.addEventListener("keydown",e=>{ const n = e.key==="ArrowDown"||e.key==="ArrowRight"?1:e.key==="ArrowUp"||e.key==="ArrowLeft"?-1:0;
    if(n){e.preventDefault(); const k=(i+n+UNSUR.length)%UNSUR.length; showUnsur(k); ul.querySelectorAll("button")[k].focus();}});
  li.appendChild(b); ul.appendChild(li);
});
showUnsur(0);

/* ---------- Peta helper ---------- */
function drawMap(svg, cells, outline, labelFn, cls){
  const keys = Object.keys(cells).sort();
  keys.forEach((k,i)=>{
    const p=document.createElementNS(SVGNS,"path");
    p.setAttribute("d",cells[k].d); p.setAttribute("class","cell t"+(i%3+1)+(cls?cls(k):""));
    p.setAttribute("tabindex","0"); p.setAttribute("role","button"); p.dataset.k=k;
    p.setAttribute("aria-label",labelFn(k).aria);
    svg.appendChild(p);
  });
  const o=document.createElementNS(SVGNS,"path"); o.setAttribute("d",outline); o.setAttribute("class","outline"); svg.appendChild(o);
  keys.filter(k=>cls&&cls(k).includes("kita")).forEach(k=>{const r=document.createElementNS(SVGNS,"path"); r.setAttribute("d",cells[k].d); r.setAttribute("class","ring"); svg.appendChild(r);});
  keys.forEach(k=>{
    const L=labelFn(k);
    const t=document.createElementNS(SVGNS,"text"); t.setAttribute("x",cells[k].lx); t.setAttribute("y",cells[k].ly-(L.sub?8:0));
    t.setAttribute("class","lbl"); t.dataset.k=k; t.textContent=L.main; svg.appendChild(t);
    if(L.sub){const s=document.createElementNS(SVGNS,"text"); s.setAttribute("x",cells[k].lx); s.setAttribute("y",cells[k].ly+14); s.setAttribute("class","lbl small"); s.dataset.k=k; s.textContent=L.sub; svg.appendChild(s);}
  });
}
function bindMap(svg, onPick){
  svg.querySelectorAll(".cell").forEach(p=>{
    p.addEventListener("click",()=>onPick(p.dataset.k));
    p.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onPick(p.dataset.k);}});
  });
}
function markSel(svg,k){
  svg.querySelectorAll(".cell").forEach(p=>p.classList.toggle("sel",p.dataset.k===k));
  svg.querySelectorAll(".lbl").forEach(t=>t.classList.toggle("on",t.dataset.k===k));
}

/* ---------- Pasar Rebo ---------- */
const svgPR=document.getElementById("mapPR"), panelPR=document.getElementById("panelPR");
drawMap(svgPR, GEO.pr, GEO.prOutline, k=>({main:DATA.kelurahan[k].nama, aria:"Kelurahan "+DATA.kelurahan[k].nama}), k=>k==="kalisari"?" kita":"");
function showPR(k){
  markSel(svgPR,k);
  if(!k){
    panelPR.innerHTML=`<h3>Kecamatan Pasar Rebo</h3><p class="sub">Jakarta Timur, terdiri dari 5 kelurahan</p><ul class="people">${person("Ketua Karang Taruna Kecamatan",DATA.kecamatan.ketuaKartar,"Mengoordinasikan Karang Taruna tingkat kelurahan se-Pasar Rebo.","m")}</ul><p class="status">Pilih kelurahan di denah untuk melihat ketua Karang Tarunanya.</p>`;
    return;
  }
  const kel=DATA.kelurahan[k];
  panelPR.innerHTML=`<h3>Kelurahan ${kel.nama}${k==="kalisari"?'<span class="badge">Kelurahan kita</span>':""}</h3><p class="sub">Kecamatan Pasar Rebo</p><ul class="people">${person("Ketua Karang Taruna Kelurahan "+kel.nama,kel.ketuaKartar,"","k")}${person("Ketua Karang Taruna Kecamatan",DATA.kecamatan.ketuaKartar,"","m")}</ul>`+
    (k==="kalisari"?`<a class="btn" href="#kalisari">Buka peta RW Kalisari</a> `:"")+`<button class="btn ghost" id="backPR">Lihat tingkat kecamatan</button>`;
  document.getElementById("backPR").addEventListener("click",()=>showPR(null));
}
bindMap(svgPR, showPR); showPR(null);

/* ---------- Kalisari ---------- */
const svgKal=document.getElementById("mapKal"), panelKal=document.getElementById("panelKal"), chips=document.getElementById("chipsKal");
const noUnit = k => DATA.rw[k] && DATA.rw[k].adaUnit === false;
svgKal.innerHTML = '<defs><pattern id="arsir" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="10" height="10" fill="var(--paper)"/><line x1="0" y1="0" x2="0" y2="10" stroke="var(--line)" stroke-width="5"/></pattern></defs>';
drawMap(svgKal, GEO.kal, GEO.kalOutline, k=>({main:"RW "+k, sub:noUnit(k)?"belum ada unit":"", aria:"RW "+k+" Kalisari"+(noUnit(k)?", belum ada Karang Taruna Unit":"")}), k=>noUnit(k)?" nounit":"");
Object.keys(DATA.rw).sort().forEach(k=>{const b=document.createElement("button"); b.textContent=k; b.setAttribute("aria-pressed","false"); b.setAttribute("aria-label","RW "+k); b.addEventListener("click",()=>showKal(k)); chips.appendChild(b);});
function filled(){
  const vals=[DATA.kecamatan.ketuaKartar,DATA.kecamatan.tksk,...Object.values(DATA.kalisari),...Object.values(DATA.kelurahan).map(x=>x.ketuaKartar),...Object.values(DATA.rw).flatMap(r=>r.adaUnit===false?[r.ketuaRW,r.lmk]:[r.ketuaRW,r.lmk,r.ketuaKartar])];
  return [vals.filter(v=>v&&v.trim()).length, vals.length];
}
function showKal(k){
  markSel(svgKal,k);
  chips.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed", b.textContent===k));
  if(!k){
    const [a,n]=filled(); const nu=Object.keys(DATA.rw).filter(noUnit);
    panelKal.innerHTML=`<h3>RW di Kalisari</h3><p class="sub">${Object.keys(DATA.rw).length} RW, ${Object.values(DATA.rw).reduce((s,r)=>s+r.rt.length,0)} RT, ${Object.keys(DATA.rw).length-nu.length} Karang Taruna Unit</p><ul class="people">
      ${person("Ketua Karang Taruna Kelurahan Kalisari",DATA.kelurahan.kalisari.ketuaKartar,"Mengoordinasikan seluruh Karang Taruna Unit di Kalisari.","k")}
    </ul><p class="status">Pilih RW di denah untuk melihat Ketua RW, LMK, dan Ketua Karang Taruna Unitnya.${a<n?` Data terisi ${a} dari ${n}.`:""}</p>`;
    return;
  }
  const r=DATA.rw[k];
  panelKal.innerHTML=`<h3>RW ${k}</h3><p class="sub">Kelurahan Kalisari, ${r.rt.length} RT</p>${r.catatan?`<p class="catat">${esc(r.catatan)}</p>`:""}<ul class="people">
    ${person("Ketua RW "+k+(r.plt?" (Plt)":""),r.ketuaRW,r.adaUnit===false?"Pengurus lingkungan RW.":"Pengurus lingkungan RW, mitra utama Karang Taruna Unit.","m")}
    ${person("LMK RW "+k,r.lmk,"Wakil RW di Lembaga Musyawarah Kelurahan, penyalur aspirasi warga.","")}
    ${r.adaUnit===false?"":person("Ketua Karang Taruna Unit RW "+k,r.ketuaKartar,"","k")}
  </ul>${r.adaUnit===false?`<p class="nounit-note">RW ${k} belum memiliki Karang Taruna Unit.</p>`:""}<details class="rt"><summary>Ketua RT di RW ${k} (${r.rt.length})</summary><ol>${r.rt.map((n,i)=>`<li><span>RT ${String(i+1).padStart(3,"0")}</span>${esc(n)}</li>`).join("")}</ol></details><button class="btn ghost" id="backKal">Kembali ke ringkasan RW</button>`;
  document.getElementById("backKal").addEventListener("click",()=>showKal(null));
}
bindMap(svgKal, showKal); showKal(null);

/* ---------- Stakeholder Kalisari ---------- */
const K=DATA.kalisari;
const GRUP=[
  ["Pemerintah Kelurahan Kalisari",[
    ["Lurah Kalisari",K.lurah,"Pimpinan pemerintahan kelurahan dan pembina Karang Taruna di tingkat kelurahan.","m"],
    ["Sekretaris Kelurahan",K.sekel,"Membantu lurah dalam administrasi dan koordinasi kegiatan kelurahan.",""],
    ["Kasi Kesra Kelurahan Kalisari",K.kasiKesra,"Kepala Seksi Kesejahteraan Rakyat. Membidangi urusan sosial di kelurahan dan menjadi penghubung kegiatan Karang Taruna dengan kelurahan.","m"]]],
  ["Karang Taruna",[
    ["Ketua Karang Taruna Kelurahan Kalisari",DATA.kelurahan.kalisari.ketuaKartar,"Memimpin Karang Taruna Kalisari dan mengoordinasikan Karang Taruna Unit di setiap RW.","k"],
    ["Ketua Karang Taruna Kecamatan Pasar Rebo",DATA.kecamatan.ketuaKartar,"Mengoordinasikan Karang Taruna di lima kelurahan se-Pasar Rebo.","k"]]],
  ["Lembaga kemasyarakatan mitra",[
    ["Ketua LMK Kelurahan Kalisari",K.ketuaLMK,"Lembaga Musyawarah Kelurahan, menampung aspirasi warga dari setiap RW.",""],
    ["Ketua TP PKK Kelurahan Kalisari",K.ketuaPKK,"Mitra kegiatan sosial kemasyarakatan, misalnya kegiatan keluarga dan posyandu.",""]]],
  ["Pendamping sosial",[
    ["TKSK Kecamatan Pasar Rebo",DATA.kecamatan.tksk,"Tenaga Kesejahteraan Sosial Kecamatan, pendamping kegiatan kesejahteraan sosial di wilayah kecamatan.",""]]]
];
document.getElementById("shKal").innerHTML=GRUP.map(([g,ps])=>`<div class="grp"><h4>${g}</h4><ul class="people">${ps.map(x=>person(...x)).join("")}</ul></div>`).join("");

document.getElementById("hukumList").innerHTML=DATA.dasarHukum.map(h=>`<div><b>${h.nomor&&h.nomor.trim()?esc(h.jenis+" "+h.nomor):`${esc(h.jenis)}<br><span class="kosong">Nomor &amp; tahun belum diisi</span>`}</b><span>tentang ${esc(h.tentang)}</span></div>`).join("");

/* ---------- Kuis ---------- */
const KUIS=[
  {q:"Kapan Karang Taruna lahir?", o:["17 Agustus 1945","26 September 1960","28 Oktober 1928","1 Juni 1965"], a:1, e:"Karang Taruna lahir 26 September 1960 di Kampung Melayu, Jakarta."},
  {q:"Apa arti kata “Taruna”?", o:["Pemimpin","Pekarangan","Remaja","Pejuang"], a:2, e:"Karang berarti pekarangan atau tempat, Taruna berarti remaja."},
  {q:"Tujuh daun bagian atas lambang melambangkan…", o:["Tujuh fungsi Karang Taruna","Tujuh unsur kepribadian anak dan remaja","Tujuh kelurahan","Tujuh pengurus inti"], a:1, e:"Taat, Tanggap, Tanggon, Tandas, Tangkas, Trampil, Tulus."},
  {q:"Lingkaran pada lambang Karang Taruna melambangkan…", o:["Persatuan seluruh pemuda","Tameng, lambang Ketahanan Nasional","Matahari yang bersinar","Bumi tempat berpijak"], a:1, e:"Lingkaran melambangkan tameng sebagai lambang Ketahanan Nasional."},
  {q:"Berapa jumlah RW di Kelurahan Kalisari?", o:["9 RW","10 RW","11 RW","12 RW"], a:1, e:"Kalisari terdiri dari 10 RW dan 105 RT. Nomor RW 06 tidak ada."},
  {q:"Kelurahan Kalisari berada di kecamatan…", o:["Ciracas","Kramat Jati","Pasar Rebo","Cipayung"], a:2, e:"Kalisari satu dari lima kelurahan di Kecamatan Pasar Rebo, bersama Gedong, Baru, Cijantung, dan Pekayon."}
];
const kuisBox=document.getElementById("kuisBox"), skor=document.getElementById("skor"); let benar=0, dijawab=0;
KUIS.forEach((k,i)=>{
  const d=document.createElement("div"); d.className="q";
  d.innerHTML=`<p>${i+1}. ${k.q}</p><div class="opts">${k.o.map((o,j)=>`<button data-j="${j}">${o}</button>`).join("")}</div><div class="fb" aria-live="polite"></div>`;
  d.querySelectorAll(".opts button").forEach(b=>b.addEventListener("click",()=>{
    const j=+b.dataset.j; d.querySelectorAll(".opts button").forEach(x=>x.disabled=true);
    d.querySelectorAll(".opts button")[k.a].classList.add("ok");
    if(j===k.a){benar++; d.querySelector(".fb").textContent="Benar. "+k.e;} else {b.classList.add("no"); d.querySelector(".fb").textContent="Belum tepat. "+k.e;}
    dijawab++; if(dijawab===KUIS.length) skor.textContent=`Skor: ${benar} dari ${KUIS.length}`;
  }));
  kuisBox.appendChild(d);
});

/* ---------- Nav aktif ---------- */
const links=[...document.querySelectorAll(".nav a")];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id));}}),{rootMargin:"-40% 0px -55% 0px"});
document.querySelectorAll("section.sec").forEach(s=>io.observe(s));
