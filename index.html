<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ResiPro Ultra-Light</title>
    <script src="https://cdn.jsdelivr.net/npm/pdf-lib@1.4.0/dist/pdf-lib.min.js"></script>
    <style>
        body { font-family: sans-serif; background: #f0f2f5; padding: 20px; display: flex; justify-content: center; }
        .card { background: #fff; padding: 25px; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); width: 100%; max-width: 350px; text-align: center; }
        h2 { color: #ff4500; margin: 0 0 15px 0; }
        #drop { border: 2px dashed #ff4500; padding: 30px 10px; border-radius: 10px; background: #fffaf9; cursor: pointer; }
        button { margin-top: 20px; width: 100%; padding: 15px; background: #ff4500; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }
        #status { margin-top: 15px; font-size: 12px; text-align: left; background: #333; color: #0f0; padding: 10px; border-radius: 5px; height: 100px; overflow-y: auto; font-family: monospace; }
    </style>
</head>
<body>

<div class="card">
    <h2>🚀 RESI PRO</h2>
    <p style="font-size: 11px; color: #666; margin-bottom: 15px;">Versi HP Ringan - Anti Error</p>
    
    <div id="drop" onclick="document.getElementById('in').click()">
        <b>KETUK UNTUK PILIH PDF</b>
        <input type="file" id="in" accept="application/pdf" multiple style="display:none" onchange="up()">
    </div>

    <button id="btn" onclick="go()" disabled>PROSES SEKARANG</button>
    <div id="status">Ready...</div>
</div>

<script>
    const elIn = document.getElementById('in');
    const elBtn = document.getElementById('btn');
    const elStat = document.getElementById('status');

    function log(m) { elStat.innerHTML += "<br>> " + m; elStat.scrollTop = elStat.scrollHeight; }
    function up() { if(elIn.files.length > 0) { log(elIn.files.length + " file dipilih"); elBtn.disabled = false; } }

    async function go() {
        elBtn.disabled = true;
        elStat.innerHTML = "Memulai...";
        
        try {
            const { PDFDocument } = PDFLib;
            const outDoc = await PDFDocument.create();
            
            // Ukuran Thermal 100x150mm (poin)
            const tW = 283.46;
            const tH = 425.20;

            for (const f of elIn.files) {
                log("Processing: " + f.name);
                const buf = await f.arrayBuffer();
                const inDoc = await PDFDocument.load(buf);
                
                // Copy halaman ke-1
                const [copyPage] = await outDoc.copyPages(inDoc, [0]);
                
                // Tambah halaman baru
                const page = outDoc.addPage([tW, tH]);
                
                // Ambil ukuran & Hitung Skala
                const pW = copyPage.getWidth();
                const pH = copyPage.getHeight();
                const sc = tW / pW;

                // Gambar halaman
                page.drawPage(copyPage, {
                    x: 0,
                    y: tH - (pH * sc),
                    width: pW * sc,
                    height: pH * sc
                });
                
                log("Berhasil memotong " + f.name);
            }

            log("Menyimpan file...");
            const res = await outDoc.save();
            const b = new Blob([res], { type: 'application/pdf' });
            const u = URL.createObjectURL(b);
            
            const a = document.createElement('a');
            a.href = u;
            a.download = "RESI_HASIL_PRINT.pdf";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            log("<b>DONE! CEK DOWNLOAD.</b>");
        } catch (e) {
            log("<span style='color:red'>ERR: " + e.message + "</span>");
            console.error(e);
        }
        elBtn.disabled = false;
    }
</script>

</body>
</html>
