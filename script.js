// Variabel Global
let dataPesanan = [];
let totalCetakHariIni = 0;
const MAX_CETAK_GRATIS = 10;
let isProVersion = false; // Ganti jadi true jika pengguna sudah Pro

// Inisialisasi Aplikasi
window.onload = function() {
    // Cek jumlah cetak hari ini dari localStorage
    const today = new Date().toISOString().split('T')[0];
    const savedData = localStorage.getItem('printBellProData');
    if (savedData) {
        const data = JSON.parse(savedData);
        if (data.tanggal === today) {
            totalCetakHariIni = data.jumlahCetak;
        }
    }

    // Tampilkan notifikasi jumlah cetak
    showNotification(`Sisa kuota cetak hari ini: ${MAX_CETAK_GRATIS - totalCetakHariIni} (Gratis)`, 'info');

    // Cek tema aplikasi
    const tema = localStorage.getItem('appTheme') || 'light';
    document.body.classList.toggle('dark', tema === 'dark');
    document.getElementById('app-theme').value = tema;
};

// Navigasi Tab
function openTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabName).classList.remove('hidden');
    event.target.classList.add('active');
}

// Fungsi Notifikasi
function showNotification(message, type) {
    const notif = document.createElement('div');
    notif.className = `notification notif-${type}`;
    notif.textContent = message;
    document.body.appendChild(notif);
    notif.style.display = 'block';
    setTimeout(() => {
        notif.style.opacity = '0';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// === FITUR RESI MARKETPLACE ===
// Load Data Marketplace
function loadMPData(input) {
    if (input.files.length === 0) return;

    // Cek ekstensi file (Excel hanya untuk Pro)
    const fileName = input.files[0].name;
    if (fileName.endsWith('.xlsx') && !isProVersion) {
        showNotification('Dukungan file Excel hanya untuk versi Pro', 'error');
        return;
    }

    // Baca file CSV
    Papa.parse(input.files[0], {
        header: true,
        complete: function(results) {
            dataPesanan = results.data;
            const select = document.getElementById('mp-pesanan');
            const bulkList = document.getElementById('bulk-pesanan-list');
            select.innerHTML = '';
            bulkList.innerHTML = '';

            // Isi dropdown dan list cetak masal
            dataPesanan.forEach((pesanan, index) => {
                // Dropdown single
                const option = document.createElement('option');
                option.value = index;
                option.text = `${pesanan.penerima} - ${pesanan.no_resi}`;
                select.appendChild(option);

                // List bulk print
                const bulkItem = document.createElement('div');
                bulkItem.className = 'bulk-item';
                bulkItem.innerHTML = `
                    <input type="checkbox" class="bulk-checkbox" value="${index}">
                    <span>${pesanan.no_resi} - ${pesanan.penerima}</span>
                `;
                bulkList.appendChild(bulkItem);
            });

            document.getElementById('mp-data-section').classList.remove('hidden');
            // Tampilkan fitur cetak masal jika Pro
            if (isProVersion) {
                document.getElementById('mp-bulk-section').classList.remove('hidden');
                document.querySelectorAll('.pro-feature').forEach(el => el.classList.remove('hidden'));
            }
            loadMPLabelPreview();
        }
    });
}

// Load Preview Resi Marketplace
function loadMPLabelPreview() {
    const index = document.getElementById('mp-pesanan').value;
    const data = dataPesanan[index];
    const paperSize = document.querySelector('input[name="paper-size"]:checked').value;

    // Set ukuran label
    const label = document.getElementById('mp-label');
    label.className = `label mp-label size-${paperSize}`;

    // Isi data ke preview
    document.getElementById('mp-mp-name').textContent = data.marketplace;
    document.getElementById('mp-no-resi').textContent = data.no_resi;
    document.getElementById('mp-pengirim').textContent = data.pengirim;
    document.getElementById('mp-penerima').textContent = data.penerima;
    document.getElementById('mp-hp').textContent = data.hp_penerima;
    document.getElementById('mp-alamat').textContent = data.alamat;
    document.getElementById('mp-note-text').textContent = document.getElementById('mp-note').value;

    // Tampilkan logo toko (jika ada dan Pro)
    const storeLogo = document.getElementById('mp-store-logo');
    storeLogo.src = localStorage.getItem('savedLogo') || 'https://via.placeholder.com/60';
    storeLogo.style.display = isProVersion ? 'block' : 'none';

    // Crop elemen jika Pro
    const cropElements = document.querySelectorAll('input[name="crop-element"]:checked');
    cropElements.forEach(el => {
        if (el.value === 'logo_mp') document.querySelector('.mp-info span').style.display = 'none';
        if (el.value === 'detail_kurir') document.getElementById('mp-crop-area').style.display = 'none';
    });

    // Generate barcode
    JsBarcode("#mp-barcode", data.no_resi, { format: "CODE128", displayValue: true });
    document.getElementById('mp-preview-section').classList.remove('hidden');
}

// Cetak Single Resi Marketplace
function printMPLabel() {
    // Cek kuota jika bukan Pro
    if (!isProVersion) {
        if (totalCetakHariIni >= MAX_CETAK_G
