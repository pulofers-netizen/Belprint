# 🖨️ SmartPrint Hub
**Aplikasi Cetak Label Thermal PWA - Khusus Marketplace (Shopee, TikTok, Lazada)**

![Version](https://img.shields.io/badge/version-2.0.0-blueviolet)
![Platform](https://img.shields.io/badge/platform-Android%20|%20iOS%20|%20Desktop-orange)
![PWA](https://img.shields.io/badge/PWA-Ready-success)

SmartPrint Hub adalah aplikasi berbasis web (PWA) yang dirancang untuk mempercepat proses cetak resi pengiriman tanpa perlu download PDF. Fokus pada kecepatan, kemudahan penggunaan di HP, dan penghematan kertas label.

---

## 🚀 Fitur Utama (V2.0)

* **📱 Installable (PWA):** Bisa diinstal di layar utama HP tanpa melalui Play Store. Muncul di menu "Share" Android.
* **✂️ Smart Auto-Crop:** Menghilangkan area putih kosong pada resi PDF marketplace agar pas di kertas thermal 58/80/100mm.
* **📋 Marketplace Parser:** Cukup salin informasi pengiriman, aplikasi otomatis memisahkan Nama, No HP, dan Alamat.
* **♻️ Ultra Paper Saver:** Menggunakan perintah ESC/POS `line-spacing 0` untuk memastikan tidak ada kertas yang terbuang sia-sia.
* **✨ Modern UI:** Desain *Glassmorphism* yang nyaman dipandang dan tombol besar yang ramah jempol.

---

## 🛠️ Persiapan & Instalasi

1.  **Hosting:** Gunakan GitHub Pages (Akses via HTTPS wajib untuk fitur Bluetooth).
2.  **Instal di HP:**
    * Buka URL GitHub Pages di **Google Chrome Android**.
    * Klik menu titik tiga (⋮) di pojok kanan atas.
    * Pilih **"Instal Aplikasi"** atau **"Tambahkan ke Layar Utama"**.
3.  **Izin Browser:** Pastikan memberikan izin Bluetooth dan Clipboard saat diminta.

---

## 📖 Cara Penggunaan

### Metode 1: Copy-Paste (Cepat)
1.  Buka aplikasi Marketplace (Shopee/TikTok/Lazada).
2.  Salin informasi pengiriman pada pesanan.
3.  Buka SmartPrint, klik tombol **"Tempel Data Marketplace"**.
4.  Pilih ukuran kertas (58/80/100mm) dan klik **Cetak**.

### Metode 2: Direct Share (Profesional)
1.  Pada tampilan "Cetak PDF" di marketplace, klik **Share/Bagikan**.
2.  Pilih ikon **SmartPrint**.
3.  Resi akan terpotong (crop) otomatis. Klik **Cetak**.

---

## 📝 Catatan Teknis
* **Printer:** Mendukung hampir semua printer thermal Bluetooth & USB (ESC/POS).
* **Browser:** Sangat disarankan menggunakan **Google Chrome** karena mendukung Web Bluetooth API secara penuh.

---
Dibuat untuk membantu seller UMKM agar proses packing lebih efisien! 📦⚡
