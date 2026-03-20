<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ResiPro Fixed</title>
    <script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
    <style>
        body { font-family: sans-serif; background: #f4f7f9; padding: 20px; text-align: center; }
        .kartu { background: #fff; border-radius: 15px; padding: 25px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); max-width: 400px; margin: auto; }
        h2 { color: #ff4500; margin-top: 0; }
        .input-grup { margin: 20px 0; border: 2px dashed #ff4500; padding: 20px; border-radius: 10px; }
        button { background: #ff4500; color: #fff; border: none; padding: 15px; width: 100%; border-radius: 8px; font-weight: bold; font-size: 16px; cursor: pointer; }
        button:disabled { background: #ccc; }
        #log { margin-top: 15px; font-size: 12px; color: #333; background: #eee; padding: 10px; border-radius: 5px; text-align: left; height: 150px; overflow-y: auto; }
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
    <div id="log">Status: Menunggu file...</div>
</div>

<script>
    function tampilLog(pesan) {
        const logBox = document.getElementById('log');
        logBox.innerHTML += "<br>> " + pesan;
        logBox.scrollTop = logBox.scrollHeight;
    }

    async function mulaiProses() {
        const input = document.getElementById('pilihFile');
        const tombol = document.getElementById('tombol');
        
        if (input.files.length === 0) {
            alert("Pilih file resi dulu!");
            return;
        }

        tombol.disabled = true;
        document.getElementById('log').innerHTML = "Memulai...";

        try {
            const { PDFDocument } = PDFLib;
            const pdfBaru = await PDFDocument.create();
            
            // Ukuran Thermal 10x15cm dalam poin
            const lebarT = 100 * 2.83465;
            const tinggiT = 150 * 2.83465;

            for (const file of input.files) {
                tampilLog("Membaca: " + file.name);
                const bytes = await file.arrayBuffer();
                const pdfLama = await PDFDocument.load(bytes);
                
                // Ambil halaman pertama
                const [halSatu] = await pdfBaru.embedPdf(pdfLama, [0]);
                
                const halBaru = pdfBaru.addPage([lebarT, tinggiT]);
                
                // Menghitung skala agar resi pas di lebar kertas (100mm)
                const skala = lebarT / halSatu.width;

                halBaru.drawPage(halSatu, {
                    x: 0,
                    y: tinggiT - (halSatu.height * skala),
                    width: halSatu.width * skala,
                    height: halSatu.height * skala
                });
            }

            tampilLog("Menyimpan...");
            const pdfHasil = await pdfBaru.save();
            const blob = new Blob([pdfHasil], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = "RESI_GABUNG_THERMAL.pdf";
            link.click();

            tampilLog("<b>BERHASIL!</b>");
            tombol.disabled = false;

        } catch (err) {
            tampilLog("<span style='color:red'>ERROR: " + err.message + "</span>");
            console.error(err);
            tombol.disabled = false;
        }
    }
</script>

</body>
</html>
