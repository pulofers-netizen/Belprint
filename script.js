let activeCharacteristic;

function sync() {
    document.getElementById('prevNama').innerText = document.getElementById('nama').value || "-";
    document.getElementById('prevTelp').innerText = document.getElementById('telp').value || "-";
    document.getElementById('prevAlamat').innerText = document.getElementById('alamat').value || "-";
}

function updatePaperSize() {
    document.getElementById('printArea').className = document.getElementById('sizeSelect').value;
}

async function pasteAndParse() {
    try {
        const text = await navigator.clipboard.readText();
        
        // Logika Auto-Cut & Parser untuk Shopee, TikTok, Lazada
        // Mencari pola Nama, Telp, dan Alamat
        let lines = text.split('\n').map(l => l.trim()).filter(l => l !== "");
        
        // Contoh pembersihan sederhana:
        if (text.includes("Penerima:")) {
            document.getElementById('nama').value = lines[lines.indexOf("Penerima:") + 1] || "";
            document.getElementById('telp').value = lines.find(l => /\d{10,}/.test(l)) || "";
            document.getElementById('alamat').value = lines.slice(4, 7).join(" ");
        } else {
            // Manual parsing jika format tidak baku
            document.getElementById('nama').value = lines[0] || "";
            document.getElementById('telp').value = lines[1] || "";
            document.getElementById('alamat').value = lines.slice(2).join(" ");
        }
        sync();
    } catch (err) {
        alert("Klik 'Izinkan' untuk mengakses Clipboard!");
    }
}

async function connectBT() {
    try {
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ services: ['000018f0-0000-1000-8000-00805f9b34fb'] }],
            optionalServices: ['000018f0-0000-1000-8000-00805f9b34fb']
        });
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb');
        activeCharacteristic = await service.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb');
        alert("Printer Siap!");
    } catch (e) {
        alert("Koneksi Gagal: " + e);
    }
}

async function printLabel() {
    if (!activeCharacteristic) return alert("Hubungkan Bluetooth dulu!");

    const nama = document.getElementById('prevNama').innerText;
    const telp = document.getElementById('prevTelp').innerText;
    const alamat = document.getElementById('prevAlamat').innerText;

    // Perintah ESC/POS untuk hemat kertas
    const encoder = new TextEncoder();
    const data = encoder.encode(
        "\x1B\x40" +          // Reset printer
        "\x1B\x61\x01" +      // Center align
        "LABEL PENGIRIMAN\n" +
        "----------------\n" +
        "\x1B\x61\x00" +      // Left align
        "Penerima: " + nama + "\n" +
        "Telp: " + telp + "\n" +
        "Alamat:\n" + alamat + "\n" +
        "\n\n\x1B\x69"        // Feed sedikit & Potong (Jika printer dukung autocut)
    );

    await activeCharacteristic.writeValue(data);
}
