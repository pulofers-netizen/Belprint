// Register Service Worker
if ('serviceWorker' in navigator) { navigator.serviceWorker.register('./sw.js'); }

let activeCharacteristic;
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

function sync() {
    document.getElementById('prevNama').innerText = document.getElementById('nama').value || "-";
    document.getElementById('prevTelp').innerText = document.getElementById('telp').value || "-";
    document.getElementById('prevAlamat').innerText = document.getElementById('alamat').value || "-";
}

function updatePaperSize() {
    const size = document.getElementById('sizeSelect').value;
    document.getElementById('printArea').className = size;
}

// Fungsi Parser Marketplace
async function pasteAndParse() {
    try {
        const text = await navigator.clipboard.readText();
        let nama = "", telp = "", alamat = "";

        if (text.includes("Penerima:") || text.includes("Nama Penerima")) {
            const lines = text.split('\n').map(l => l.trim());
            nama = text.match(/Penerima:\s*(.*)/)?.[1] || lines[0];
            telp = text.match(/\d{10,14}/)?.[0] || "";
            alamat = text.split(telp)[1]?.trim() || "Alamat tidak terurai";
        } else {
            const lines = text.split('\n');
            nama = lines[0]; telp = lines[1]; alamat = lines.slice(2).join(" ");
        }

        document.getElementById('nama').value = nama;
        document.getElementById('telp').value = telp;
        document.getElementById('alamat').value = alamat;
        sync();
    } catch (e) { alert("Izinkan Clipboard!"); }
}

// Logika Cetak & Koneksi
async function connectBT() {
    try {
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ services: ['000018f0-0000-1000-8000-00805f9b34fb'] }],
            optionalServices: ['000018f0-0000-1000-8000-00805f9b34fb']
        });
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb');
        activeCharacteristic = await service.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb');
        alert("Printer Terhubung!");
    } catch (e) { alert("Error: " + e); }
}

async function printLabel() {
    if (!activeCharacteristic) return alert("Koneksi printer dulu!");
    const content = document.getElementById('labelContent').innerText;
    const encoder = new TextEncoder();
    // ESC/POS: Reset, Line Spacing 0 (Hemat), Content, Feed & Cut
    const data = encoder.encode("\x1B\x40\x1B\x33\x00" + content + "\n\n\n\x1D\x56\x01");
    await activeCharacteristic.writeValue(data);
    alert("Mencetak...");
}
