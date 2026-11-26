/* =========================================================
   DATA STAKEHOLDER — isi nama di antara tanda kutip "".
   Kolom yang masih kosong tampil sebagai “Belum diisi”.
   Tulis null (tanpa kutip) bila jabatannya memang tidak ada.
   ========================================================= */
const DATA = {
  kecamatan: { nama: "Pasar Rebo", ketuaKartar: "Muhammad Reza Saputra", tksk: "" },
  kalisari: {
    lurah: "Siti Nurhasanah, S.E.",            // Lurah Kalisari
    sekel: null,          // Sekretaris Kelurahan
    kasiKesra: "Safarini Arianti, S.STP",      // Kepala Seksi Kesejahteraan Rakyat
    ketuaLMK: "H. Kartonadi, S.E.",      // Ketua LMK Kelurahan
    ketuaPKK: "Ibu Maymunah"      // Ketua TP PKK Kelurahan
  },
  // Dasar hukum: isi nomor & tahun peraturan terbaru
  dasarHukum: [
    { jenis: "Peraturan Menteri Sosial", nomor: "Nomor 9 Tahun 2025", tentang: "Karang Taruna" },
    { jenis: "Peraturan Gubernur Jakarta", nomor: "Nomor 81 Tahun 2021", tentang: "Karang Taruna" }
  ],
  kelurahan: {
    gedong:    { nama: "Gedong",    ketuaKartar: "Muhammad Fachri" },
    cijantung: { nama: "Cijantung", ketuaKartar: "Diva Hizbullah" },
    baru:      { nama: "Baru",      ketuaKartar: "Gandi" },
    pekayon:   { nama: "Pekayon",   ketuaKartar: "Mila Aulia" },
    kalisari:  { nama: "Kalisari",  ketuaKartar: "Andree Bianco Susanto" }
  },
  // Sumber Ketua RW & RT: Data RT dan RW Tahun 2025, Kelurahan Kalisari
  // Kalisari punya 10 RW (tidak ada RW 06) dan 105 RT
  rw: {
    "01": { ketuaRW: "Kusni Eddy, S.E.", lmk: "Sri Pujiono", ketuaKartar: "Fian Azis Denata",
            rt: ["Rendi Elman Augustian", "Yudi Emeta", "Achmad Faizal", "Tika", "Sukino", "Suharjono, S.Pd., M.M.", "Acep Kurniawan", "Sahlanuddin Setiadno", "Nisi bin Amsir", "Yusup", "Adi Solihin", "Nami bin Asan", "Desi Anggraeni", "Arifin"] },
    "02": { ketuaRW: "Budi Murdiansyah", lmk: "Sarto Edi Wibowo", ketuaKartar: "Arif Ramtoni", catatan: "Kantor Kelurahan Kalisari berada di wilayah RW 02.",
            rt: ["M. Husni", "Budiman", "Yulisah Hasibuan", "Murwantono", "Slamet Arkanudin", "Muhidin", "Ahmad Rokib", "Slamet Prayoga", "Sudirman", "Miptahul Iman", "Parmin", "Paimin", "Effendi Sapuan"] },
    "03": { ketuaRW: "Arif Maulana", lmk: "Yan Sumarna", ketuaKartar: "Muhammad Aditya Rizki Akbar",
            rt: ["H. Basuki", "Rosidi", "Subur", "Ruddie Wijarnaka", "Suyadi", "Supardi", "H. Sutikno Pariyoto", "Sopian Hadi", "Suwariyo", "Safiih", "Sumarwan", "Nurhayati", "Muhammad Waltiko", "Siswanto"] },
    "04": { ketuaRW: "Syaipul Rohman", plt: true, lmk: "Pak Hendra", ketuaKartar: null,
            rt: ["Permana Jaya", "Agus Saryanto", "Bambang Supolo", "Tugiat", "Wawan Setiawan", "E. Santoso, S.H., M.H."] },
    "05": { ketuaRW: "Salimun", lmk: "H. Sahikan Samadi", ketuaKartar: "Anas Syahrefi Satyakusuma",
            rt: ["Zaenal Abidin, S.E.", "Teguh Cokrohariyono", "Bambang Subiyantoro", "Yayat Supriyatna, S.H.", "Tedy Ramadanus", "Sugiyanto", "R. Hendro Prasetyo", "M. Hamdani Pane"] },
    "07": { ketuaRW: "Akhmad Horiri, S.IP.", lmk: "Bu Nunung", ketuaKartar: "Annisa Nur Afifah",
            rt: ["Harmini", "Arie Soedjatmiko", "Endah Sulistyowati", "Elly Wismaning Hartati, S.H.", "Nining Rina Ningsih"] },
    "08": { ketuaRW: "Hartono", lmk: "Karjino", ketuaKartar: null,
            rt: ["Heri Susanto", "Muhaimin", "Sulyono", "Winarto", "Sis Prasetiyo"] },
    "09": { ketuaRW: "Supadi", lmk: "H. Kartonadi, S.E.", ketuaKartar: "Fatahillah Arrasyad",
            rt: ["Ruslan Rusdianto", "Subiyanto", "Ngawitiono", "Sugiyanto", "Muhammad Iqbal", "Tukiyanti", "Denni William Saputra", "Iwan Sopian", "Sudraswadi", "Karen Wibowo", "Mulyanto", "Aswahim", "Herry Winarno", "Suria", "Sarwono"] },
    "10": { ketuaRW: "Bambang Sasongko Nugroho", lmk: "Bambang Suprianto", ketuaKartar: "Adnan",
            rt: ["Tuti Alawiyah", "Fitmawati", "H. Iwan Setiawan", "Endarto", "Joko Suprianto", "Arvani Arlan", "Eni Saptihatmani", "Alip Rahman", "Octavin Teddy Pastriyanto", "Suyatini", "Agus Fatoni Supriadi", "Ir. Widayati", "Decky Aditya"] },
    "11": { ketuaRW: "Ampi Suarta", lmk: "Ampi Suarta", ketuaKartar: "Surya Akbar N.R.",
            rt: ["Sulatiyono", "Teguh Purwadi", "Hermawan, S.E.", "Wiranto", "Muhamad Syaefudin", "Mulyono", "Afid Marali", "H. Mochamad Ikbal", "Hendro Saptono", "Deni Sukendar", "Winarno", "Gustin Arden Devalino"] }
  }
};
/* ========================================================= */
