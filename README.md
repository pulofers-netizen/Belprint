<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ResiPro Fixed</title>
    <script src="https://cdn.jsdelivr.net/npm/pdf-lib/dist/pdf-lib.min.js"></script>
    <style>
        body { font-family: sans-serif; background: #f4f7f9; padding: 20px; text-align: center; }
        .kartu { background: #fff; border-radius: 15px; padding: 25px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); max-width: 400px; margin: auto; }
        h2 { color: #ff4500; margin-top: 0; }
        .input-grup { margin: 20px 0; border: 2px dashed #ff4500; padding: 20px; border-radius: 10px; }
        button { background: #ff4500; color: #fff; border: none; padding: 15px; width: 100%; border-radius: 8px; font-weight: bold; font-size: 16px; cursor: pointer; }
        button:disabled { background: #ccc; }
        #log { margin-top: 15px; font-size: 12px; color: #666; background: #eee; padding: 10px; border-radius: 5px; text-align: left; display: none; }
    </style>
</head>
<body>

<div class="kartu">
    <h2>🚀 RESI PRO</h2>
    <p style="font-size: 13px;">Gabung & Potong Otomatis (10x15cm)</p>

    <div class="input-grup">
        <input type="file" id="pilihFile" accept="application/pdf" multiple style="width: 100%;">
    </div>

    <button id="tombol" onclick="mulaiProses()">MULAI PROSES</button>
    
    <div id="log"></div>
</div>

<script>
    function tampilLog(pesan) {
        const logBox = document.getElementById('log');
        logBox.style.display = "block";
        logBox.innerText += "\n> " + pesan;
    }

    async function mulaiProses() {
        const input = document.getElementById('pilihFile');
        const tombol = document.getElementById('tombol');
        
        if (input.files.length === 0) {
            alert("Pilih minimal 1 file resi dulu ya!");
            return;
        }

        tombol.disabled = true;
        tampilLog("Memulai proses " + input.files.length + " file...");

        try {
            // Cek Library
            if (typeof PDFLib === 'undefined') {
                throw new Error("Library PDF belum siap. Pastikan internet HP aktif!");
            }

            const { PDFDocument } = PDFLib;
            const pdfBaru = await PDFDocument.create();
            
            // Ukuran Thermal 10x15cm (poin)
            const lebarT = 100 * 2.83465;
            const tinggiT = 150 * 2.83465;

            for (const file of input.files) {
                tampilLog("Membaca: " + file.name);
                const bytes = await file.arrayBuffer();
                const pdfLama = await PDFDocument.load(bytes);
                const [halSatu] = await pdfBaru.copyPages(pdfLama, [0]);
                
                const halBaru = pdfBaru.addPage([lebarT, tinggiT]);
                
                // Tempel resi ke halaman thermal (Crop otomatis bagian atas)
                halBaru.drawPage(halSatu, {
                    x: 0,
                    y: tinggiT - halSatu.getHeight(),
                    width: halSatu.getWidth(),
                    height: halSatu.getHeight()
                });
                
                halBaru.setCropBox(0, 0, lebarT, tinggiT);
            }

            tampilLog("Menyimpan file...");
            const pdfHasil = await pdfBaru.save();
            const blob = new Blob([pdfHasil], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            // Download Otomatis
            const link = document.createElement('a');
            link.href = url;
            link.download = "RESI_GABUNG_THERMAL.pdf";
            link.click();

            tampilLog("BERHASIL! Cek folder Download.");
            tombol.disabled = false;

        } catch (err) {
            tampilLog("ERROR: " + err.message);
            console.error(err);
            tombol.disabled = false;
        }
    }
</script>

</body>
</html>
