<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ResiPro Premium - Seller Tool</title>
    <script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
    <style>
        :root { --primary: #ff4500; --secondary: #2d3436; }
        body { font-family: 'Segoe UI', sans-serif; background: #f0f2f5; margin: 0; padding: 20px; color: var(--secondary); }
        .app-card { background: #fff; max-width: 450px; margin: auto; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: var(--primary); color: white; padding: 20px; text-align: center; }
        .header h2 { margin: 0; font-size: 22px; }
        .content { padding: 20px; }
        .field { text-align: left; margin-bottom: 15px; }
        label { font-size: 12px; font-weight: bold; display: block; margin-bottom: 5px; color: #666; }
        input[type="text"], input[type="file"], select { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; box-sizing: border-box; font-size: 14px; }
        .btn-proses { background: var(--primary); color: white; border: none; width: 100%; padding: 15px; border-radius: 10px; font-size: 16px; font-weight: bold; cursor: pointer; transition: 0.3s; margin-top: 10px; }
        .btn-proses:active { transform: scale(0.95); opacity: 0.9; }
        #log { margin-top: 15px; font-size: 11px; background: #f8f9fa; border: 1px solid #eee; padding: 10px; border-radius: 8px; text-align: left; max-height: 80px; overflow-y: auto; color: #555; }
        .footer { font-size: 10px; color: #aaa; margin-top: 15px; text-align: center; }
    </style>
</head>
<body>

<div class="app-card">
    <div class="header">
        <h2>🚀 RESI PRO PREMIUM</h2>
        <p style="margin:5px 0 0; font-size: 12px; opacity: 0.9;">Gabung, Crop, & Branding Otomatis</p>
    </div>

    <div class="content">
        <div class="field">
            <label>NAMA TOKO (Akan muncul di label)</label>
            <input type="text" id="namaToko" placeholder="Contoh: Budi Jaya Store">
        </div>

        <div class="field">
            <label>UPLOAD LOGO TOKO (Opsional - Format PNG/JPG)</label>
            <input type="file" id="logoInput" accept="image/*">
        </div>

        <div class="field">
            <label>PILIH RESI PDF (Bisa banyak sekaligus)</label>
            <input type="file" id="pdfInput" accept="application/pdf" multiple>
        </div>

        <button class="btn-proses" id="btn" onclick="prosesSuper()">GABUNG & CETAK RESI</button>

        <div id="log">Status: Siap kirim paket!</div>
        
        <p class="footer">Fitur: Auto-Crop 10x15cm | Watermark Video Unboxing | Custom Branding</p>
    </div>
</div>

<script>
    async function prosesSuper() {
        const pdfIn = document.getElementById('pdfInput');
        const logoIn = document.getElementById('logoInput');
        const namaToko = document.getElementById('namaToko').value || "Toko Saya";
        const btn = document.getElementById('btn');
        const log = document.getElementById('log');

        if (pdfIn.files.length === 0) return alert("Pilih file resi dulu!");

        btn.innerText = "SEDANG DIPROSES...";
        btn.disabled = true;
        log.innerHTML = "Memulai proses branding...";

        try {
            const { PDFDocument, rgb, StandardFonts } = PDFLib;
            const pdfBaru = await PDFDocument.create();
            const fontBold = await pdfBaru.embedFont(StandardFonts.HelveticaBold);
            
            // Ukuran Thermal 100x150mm (poin)
            const lebarT = 283.46;
            const tinggiT = 425.20;

            // Proses Logo jika ada
            let logoEmbed = null;
            if (logoIn.files[0]) {
                const logoBytes = await logoIn.files[0].arrayBuffer();
                logoEmbed = await pdfBaru.embedPng(logoBytes).catch(() => pdfBaru.embedJpg(logoBytes));
            }

            for (const file of pdfIn.files) {
                log.innerHTML += "<br>> Memproses: " + file.name;
                const bytes = await file.arrayBuffer();
                const pdfLama = await PDFDocument.load(bytes);
                
                // Ambil halaman resi
                const [halamanCopy] = await pdfBaru.copyPages(pdfLama, [0]);
                const halBaru = pdfBaru.addPage([lebarT, tinggiT]);

                // Gambar Resi (Crop Atas)
                const skala = lebarT / halamanCopy.getWidth();
                halBaru.drawPage(halamanCopy, {
                    x: 0,
                    y: tinggiT - (halamanCopy.getHeight() * skala),
                    width: halamanCopy.getWidth() * skala,
                    height: halamanCopy.getHeight() * skala
                });

                // --- AREA BRANDING ---
                // 1. Gambar Logo jika ada
                if (logoEmbed) {
                    halBaru.drawImage(logoEmbed, {
                        x: 10, y: 10, width: 30, height: 30
                    });
                }

                // 2. Tulis Nama Toko
                halBaru.drawText(namaToko, {
                    x: logoEmbed ? 45 : 10,
                    y: 25,
                    size: 12,
                    font: fontBold,
                    color: rgb(0, 0, 0)
                });

                // 3. Pesan Video Unboxing (Sakti!)
                halBaru.drawText("WAJIB VIDEO UNBOXING UNTUK KOMPLAIN!", {
                    x: 10,
                    y: 5,
                    size: 8,
                    font: fontBold,
                    color: rgb(0.8, 0, 0)
                });
            }

            log.innerHTML += "<br>> Menyimpan file...";
            const pdfBytes = await pdfBaru.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = "RESI_BRANDED_" + namaToko + ".pdf";
            link.click();

            log.innerHTML += "<br><b>BERHASIL! CEK DOWNLOAD.</b>";
        } catch (e) {
            log.innerHTML += "<br><span style='color:red'>Gagal: " + e.message + "</span>";
            console.error(e);
        }
        btn.innerText = "GABUNG & CETAK RESI";
        btn.disabled = false;
    }
</script>

</body>
</html>
