<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ResiPro Auto-Fit</title>
    <script src="https://unpkg.com/pdf-lib/dist/pdf-lib.min.js"></script>
    <style>
        body { font-family: sans-serif; background: #fdfdfd; padding: 20px; display: flex; justify-content: center; }
        .box { background: #fff; padding: 25px; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); width: 100%; max-width: 400px; text-align: center; border: 1px solid #eee; }
        .logo { color: #ff4500; font-size: 28px; font-weight: 800; margin-bottom: 5px; }
        .desc { font-size: 13px; color: #777; margin-bottom: 20px; }
        #drop-zone { border: 2px dashed #ff4500; border-radius: 12px; padding: 40px 10px; cursor: pointer; background: #fffaf9; transition: 0.3s; }
        #drop-zone:active { transform: scale(0.98); background: #ffece8; }
        button { margin-top: 20px; width: 100%; padding: 16px; background: #ff4500; color: #fff; border: none; border-radius: 10px; font-weight: bold; font-size: 16px; cursor: pointer; }
        button:disabled { background: #ccc; }
    </style>
</head>
<body>

<div class="box">
    <div class="logo">RESI PRO AI</div>
    <div class="desc">Auto-Crop & Merge khusus Resi Marketplace</div>

    <div id="drop-zone" onclick="document.getElementById('fileInput').click()">
        <b>Tap untuk Pilih File PDF</b>
        <p id="file-count" style="font-size: 12px; margin-top: 5px;">Bisa pilih banyak sekaligus</p>
        <input type="file" id="fileInput" accept="application/pdf" multiple style="display:none" onchange="checkFiles()">
    </div>

    <button id="btn" onclick="prosesAutoCrop()" disabled>GABUNG & POTONG OTOMATIS</button>
</div>

<script>
    const fileInput = document.getElementById('fileInput');
    const btn = document.getElementById('btn');
    const fileCountText = document.getElementById('file-count');

    function checkFiles() {
        if (fileInput.files.length > 0) {
            fileCountText.innerText = fileInput.files.length + " file dipilih";
            btn.disabled = false;
        }
    }

    async function prosesAutoCrop() {
        btn.innerText = "Memproses...";
        btn.disabled = true;

        try {
            const { PDFDocument } = PDFLib;
            const resiBaru = await PDFDocument.create();
            
            // Ukuran standar Thermal 100mm x 150mm (283.46 x 425.20 pt)
            const thermalW = 100 * 2.83465;
            const thermalH = 150 * 2.83465;

            for (const file of fileInput.files) {
                const arrayBuffer = await file.arrayBuffer();
                const pdfLama = await PDFDocument.load(arrayBuffer);
                const [halamanAsli] = await resiBaru.copyPages(pdfLama, [0]);

                // OTOMATISASI: Deteksi ukuran konten asli
                const { width, height } = halamanAsli.getSize();
                
                // Biasanya resi MP ada di pojok kiri atas A4 (Shopee/Tokped)
                // Kita buat halaman baru seukuran Thermal
                const page = resiBaru.addPage([thermalW, thermalH]);

                // Gambar halaman asli ke halaman baru
                // Kita atur agar konten dari koordinat atas PDF asli ditarik ke halaman thermal
                page.drawPage(halamanAsli, {
                    x: 0,
                    y: thermalH - height, // Menempelkan bagian atas resi ke atas kertas
                    width: width,
                    height: height,
                });

                // POTONG OTOMATIS: Memaksa area pandang hanya seukuran Thermal
                page.setCropBox(0, thermalH - thermalH, thermalW, thermalH);
            }

            const pdfBytes = await resiBaru.save();
            const blob = new Blob([pdfBytes], { type: "application/pdf" });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = "RESI_AUTO_CROP.pdf";
            link.click();

            btn.innerText = "GABUNG & POTONG OTOMATIS";
            btn.disabled = false;
        } catch (e) {
            alert("Gagal: " + e.message);
            btn.innerText = "COBA LAGI";
            btn.disabled = false;
        }
    }
</script>

</body>
</html>
