# Materi LDK Karang Taruna Kelurahan Kalisari

Web interaktif materi Latihan Dasar Kepemimpinan (LDK) Karang Taruna Kelurahan Kalisari, Kecamatan Pasar Rebo, Jakarta Timur.

Isi: pengertian, sejarah, tujuan dan fungsi, makna lambang, dasar hukum, peta Karang Taruna se-Pasar Rebo, peta RW Kalisari beserta pemangku kepentingannya, dan kuis.

## Struktur folder

```
materi-ldk-kartar-kalisari/
├── index.html            Halaman utama
├── vercel.json           Pengaturan hosting Vercel
├── assets/
│   ├── css/style.css     Tampilan
│   └── js/
│       ├── data.js       DATA STAKEHOLDER — ubah nama-nama di sini
│       ├── geo.js        Bentuk peta (tidak perlu diubah)
│       └── app.js        Logika interaktif
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

- Materi umum: slide materi Karang Taruna.
- Ketua RW dan RT: Data RT dan RW Tahun 2025, Kelurahan Kalisari.
- Batas wilayah dan bentuk peta: situs resmi Kelurahan Kalisari (timur.jakarta.go.id).
- Pembagian RW di peta Kalisari masih perkiraan sampai peta batas RW resmi tersedia.
