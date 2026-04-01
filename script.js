// Variabel global
let dataPesanan = [];
let tipeResiAktif = 'manual';

// Pilih tipe resi
function pilihTipe(tipe) {
    tipeResiAktif = tipe;
    document.querySelectorAll('.tipe-resi .btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    document.getElementById('form-manual').classList.add('hidden');
    document.getElementById('form-marketplace').classList.add('hidden');
    document.getElementById('preview-section').classList.add('hidden');
    
    document.getElementById(`form-${tipe}`).classList.remove('hidden');
}

// Baca file CSV marketplace
function bacaCSV(input) {
    if (input.files.length === 0) return;
    
    Papa.parse(input.files[0], {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            dataPesanan = results.data;
            let select = document.getElementById('pilih-pesanan');
            select.innerHTML = '';
            
            dataPesanan.forEach((pesanan, index) => {
                let option = document.createElement('option');
                option.value = index;
                option.text = `${pesanan.penerima} - ${pesanan.no_resi}`;
                select.appendChild(option);
            });
            
            document.getElementById('data-csv').classList.remove('hidden');
        }
    });
}

// Preview label
function previewLabel() {
    let data = {};
    
    if (tipeResiAktif === 'manual') {
        data = {
            pengirim: document.getElementById('pengirim').value,
            penerima: document.getElementById('penerima').value,
            alamat: document.getElementById('alamat').value,
            no_resi: document.getElementById('no-resi').value,
            marketplace: document.getElementById('marketplace').value || 'Resi Manual'
        };
    } else {
        let index = document.getElementById('pilih-pesanan').value;
        data = dataPesanan[index];
    }
    
    // Isi data ke preview
    document.getElementById('label-marketplace').textContent = data.marketplace;
    document.getElementById('label-no-resi').textContent = data.no_resi;
    document.getElementById('label-pengirim').textContent = data.pengirim;
    document.getElementById('label-penerima').textContent = data.penerima;
    document.getElementById('label-alamat').textContent = data.alamat;
    
    // Generate barcode
    JsBarcode("#barcode", data.no_resi, {
        format: "CODE128",
        displayValue: true
    });
    
    // Generate QR Code
    QRCode.toCanvas(document.getElementById('qrcode'), data.no_resi, function (error) {
        if (error) console.error(error)
    });
    
    // Tampilkan preview
    document.getElementById('preview-section').classList.remove('hidden');
}

// Cetak label
function printLabel() {
    let printContent = document.getElementById('label-resi').outerHTML;
    let originalContent = document.body.innerHTML;
    
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    location.reload(); // Refresh agar tombol bisa digunakan lagi
}

// Simpan sebagai PDF
function simpanPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [80, 120] // Ukuran label thermal umum
    });
    
    let data = {};
    if (tipeResiAktif === 'manual') {
        data = {
            pengirim: document.getElementById('pengirim').value,
            penerima: document.getElementById('penerima').value,
            alamat: document.getElementById('alamat').value,
            no_resi: document.getElementById('no-resi').value,
            marketplace: document.getElementById('marketplace').value || 'Resi Manual'
        };
    } else {
        let index = document.getElementById('pilih-pesanan').value;
        data = dataPesanan[index];
    }
    
    // Tambah konten ke PDF
    doc.setFontSize(12);
    doc.text(data.marketplace, 10, 10);
    doc.setFontSize(10);
    doc.text(`No Resi: ${data.no_resi}`, 10, 18);
    doc.line(10, 22, 70, 22); // Garis pemisah
    
    doc.text(`Pengirim: ${data.pengirim}`, 10, 30);
    doc.text(`Penerima: ${data.penerima}`, 10, 38);
    doc.text(`Alamat: ${data.alamat}`, 10, 46, { maxWidth: 60 });
    
    // Tambah barcode
    JsBarcode("#barcode", data.no_resi, { format: "CODE128" });
    const barcodeSVG = document.getElementById('barcode').outerHTML;
    doc.svg(barcodeSVG, { x: 10, y: 60, width: 60, height: 20 });
    
    // Simpan PDF
    doc.save(`Label-Resi-${data.no_resi}.pdf`);
}
