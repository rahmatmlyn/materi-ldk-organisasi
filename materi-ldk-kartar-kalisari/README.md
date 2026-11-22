# Materi LDK Karang Taruna Kelurahan Kalisari

Web interaktif materi Latihan Dasar Kepemimpinan (LDK) Karang Taruna Kelurahan Kalisari, Kecamatan Pasar Rebo, Jakarta Timur.

Isi: pengertian, sejarah, tujuan dan fungsi, makna lambang, dasar hukum, peta Karang Taruna se-Pasar Rebo, peta RW Kalisari beserta pemangku kepentingannya, dan kuis.

## Struktur folder

```
materi-ldk-kartar-kalisari/
├── index.html            Halaman utama
├── vercel.json           Pengaturan hosting Vercel
├── Materi-LDK-Karang-Taruna-Kalisari.pdf   Versi PDF untuk dibagikan
├── assets/
│   ├── img/logo-karang-taruna.png   Lambang Karang Taruna (versi cetak)
│   ├── css/style.css     Tampilan
│   ├── css/cetak.css     Tampilan versi cetak/PDF
│   └── js/
│       ├── data.js       DATA STAKEHOLDER — ubah nama-nama di sini
│       ├── geo.js        Bentuk peta (tidak perlu diubah)
│       ├── app.js        Logika interaktif
│       └── cetak.js      Isi tambahan versi cetak/PDF
└── README.md
```

## Mengisi atau mengubah data

Semua nama ada di `assets/js/data.js`. Isi di antara tanda kutip, contoh:

```js
kalisari: {
  lurah: "Nama Lurah",
  kasiKesra: "Nama Kasi Kesra",
  ...
},
```

Kolom yang masih `""` akan tampil sebagai “Belum diisi”. Untuk dasar hukum, isi `nomor` dengan nomor dan tahun peraturan, misalnya `"Nomor 10 Tahun 2025"`.

## Versi PDF

`Materi-LDK-Karang-Taruna-Kalisari.pdf` adalah versi cetak (A4) dari halaman ini untuk dibagikan. Isinya sama dengan web, ditambah tabel pengurus per RW dan daftar seluruh Ketua RT. Bagian yang hanya ada di web dan tidak ikut dicetak: Sekretaris Kelurahan, Pendamping sosial (TKSK), dan kuis Cek pemahaman. Penandanya class `screen-only`.

Setelah mengubah `data.js`, buat ulang PDF-nya dari folder ini:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --no-pdf-header-footer \
  --virtual-time-budget=15000 --print-to-pdf=Materi-LDK-Karang-Taruna-Kalisari.pdf "file://$PWD/index.html"
```

Bisa juga dengan membuka halaman di Chrome lalu **Cetak → Simpan sebagai PDF** (ukuran A4, centang *Grafik latar belakang*). Tampilan cetak diatur oleh `assets/css/cetak.css` dan `assets/js/cetak.js`.

## Mencoba di komputer

Buka `index.html` langsung di browser, atau jalankan server lokal dari folder ini:

```bash
python3 -m http.server 8000
```

lalu buka http://localhost:8000

## Hosting di Vercel

1. Upload folder ini ke repository GitHub.
2. Di vercel.com, pilih **Add New → Project**, lalu import repository tersebut.
3. Framework Preset: **Other**. Build Command dan Output Directory dibiarkan kosong.
4. Klik **Deploy**.

Setiap kali ada perubahan yang di-push ke GitHub, Vercel akan memperbarui situs secara otomatis.

## Sumber data

- Materi umum, lambang Karang Taruna (`assets/img/logo-karang-taruna.png`), dan lirik Mars Karang Taruna (ciptaan Gunadi Said): slide materi Karang Taruna.
- Ketua RW dan RT: Data RT dan RW Tahun 2025, Kelurahan Kalisari.
- Batas wilayah dan bentuk peta: situs resmi Kelurahan Kalisari (timur.jakarta.go.id).
- Pembagian RW di peta Kalisari masih perkiraan sampai peta batas RW resmi tersedia.
