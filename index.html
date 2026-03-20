<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ResiPro Premium v5</title>
    <script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
    <style>
        :root { --primary: #ff4500; }
        body { font-family: sans-serif; background: #f0f2f5; padding: 15px; }
        .card { background: #fff; max-width: 400px; margin: auto; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); overflow: hidden; text-align: center; }
        .head { background: var(--primary); color: white; padding: 15px; font-weight: bold; }
        .padd { padding: 20px; }
        input { width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box; }
        button { width: 100%; padding: 15px; background: var(--primary); color: white; border: none; border-radius: 10px; font-weight: bold; cursor: pointer; }
        #log { margin-top: 15px; font-size: 11px; background: #eee; padding: 10px; border-radius: 5px; text-align: left; max-height: 100px; overflow-y: auto; }
    </style>
</head>
<body>

<div class="card">
    <div class="head">🚀 RESI PRO PREMIUM (FIXED)</div>
    <div class="padd">
        <input type="text" id="toko" placeholder="Nama Toko">
        <input type="file" id="logo" accept="image/*">
        <label style="font-size: 11px; color: #666; display: block; text-align: left;">Pilih Resi PDF:</label>
        <input type="file" id="pdf" accept="application/pdf" multiple>
        
        <button id="btn" onclick="proses()">GABUNG & CETAK RESI</button>
        <div id="log">Status: Siap...</div>
    </div>
</div>

<script>
    async function proses() {
        const btn = document.getElementById('btn');
        const log = document.getElementById('log');
        const pdfIn = document.getElementById('pdf').files;
        const toko = document.getElementById('toko').value || "Toko Saya";

        if (pdfIn.length === 0) return alert("Pilih PDF dulu!");

        btn.disabled = true;
        log.innerHTML = "Memproses...";

        try {
            const { PDFDocument, rgb } = PDFLib;
            const pdfHasil = await PDFDocument.create();
            
            // ANGKA MATI (Point) - Kertas 10x15cm
            const W_KERTAS = 283; 
            const H_KERTAS = 425;

            // Proses Logo
            let imgLogo = null;
            const logoFile = document.getElementById('logo').files[0];
            if (logoFile) {
                const b = await logoFile.arrayBuffer();
                imgLogo = await pdfHasil.embedPng(b).catch(() => pdfHasil.embedJpg(b));
            }

            for (const f of pdfIn) {
                log.innerHTML += "<br>> Baca: " + f.name;
                const bytes = await f.arrayBuffer();
                const pdfLama = await PDFDocument.load(bytes);
                
                // Gunakan embedPdf (Cara paling kuat untuk PDF marketplace)
                const [halEmbed] = await pdfHasil.embedPdf(pdfLama, [0]);
                
                const halBaru = pdfHasil.addPage([W_KERTAS, H_KERTAS]);

                // JURUS ANTI-NaN: Kita kasih angka mati untuk width & height
                // Asumsi standar resi A4 adalah lebar ~595. Kita skalakan paksa.
                const SKALA_PAKSA = 0.47; 

                halBaru.drawPage(halEmbed, {
                    x: 0,
                    y: H_KERTAS - (595 * SKALA_PAKSA), 
                    width: W_KERTAS,
                    height: 425 // Paksa tinggi
                });

                // Watermark & Branding
                if (imgLogo) halBaru.drawImage(imgLogo, { x: 10, y: 10, width: 25, height: 25 });
                
                halBaru.drawText(toko, { x: 40, y: 20, size: 10, color: rgb(0,0,0) });
                halBaru.drawText("WAJIB VIDEO UNBOXING!", { x: 10, y: 5, size: 8, color: rgb(0.7, 0, 0) });
            }

            const res = await pdfHasil.save();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(new Blob([res], {type: 'application/pdf'}));
            link.download = "RESI_FIX.pdf";
            link.click();
            log.innerHTML += "<br><b>BERHASIL!</b>";
        } catch (e) {
            log.innerHTML += "<br><span style='color:red'>Gagal: " + e.message + "</span>";
        }
        btn.disabled = false;
    }
</script>
</body>
</html>
