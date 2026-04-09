function sync() {
    document.getElementById('prevNama').innerText = document.getElementById('nama').value || "-";
    document.getElementById('prevTelp').innerText = document.getElementById('telp').value || "-";
    document.getElementById('prevAlamat').innerText = document.getElementById('alamat').value || "-";
}

async function pasteAndParse() {
    try {
        const text = await navigator.clipboard.readText();
        const area = document.getElementById('printArea');
        const labelHead = document.querySelector('.label-header');
        
        let nama = "", telp = "", alamat = "", mp = "STANDARD";

        // 1. DETEKSI TEMPLATE MARKETPLACE
        if (text.includes("Shopee") || text.includes("No. Pesanan")) {
            mp = "SHOPEE";
            area.className = "w100 theme-shopee"; // Auto set ke 100mm untuk resi MP
            labelHead.innerText = "SHOPEE ORDER";
            // Logic ambil data Shopee
            nama = text.match(/Penerima:\s*(.*)/)?.[1] || "";
            telp = text.match(/(?:Telp:|No. Telp:)\s*(\d+)/)?.[1] || "";
            alamat = text.split(/Alamat:|Alamat Pengiriman:/)[1]?.split("Kec.")[0] || "";
        } 
        else if (text.includes("TikTok") || text.includes("Order ID")) {
            mp = "TIKTOK";
            area.className = "w100 theme-tiktok";
            labelHead.innerText = "TIKTOK SHOP";
            nama = text.match(/Penerima:\s*(.*)/)?.[1] || "";
            telp = text.match(/(\d{10,14})/)?.[1] || "";
            alamat = text.split(telp)[1]?.trim().substring(0, 150) || "";
        }
        else {
            area.className = "w58 theme-standard";
            labelHead.innerText = "CUSTOM LABEL";
            // Fallback parsing sederhana
            const lines = text.split('\n').filter(l => l.trim() !== "");
            nama = lines[0]; telp = lines[1]; alamat = lines.slice(2).join(" ");
        }

        // 2. INPUT KE FORM
        document.getElementById('nama').value = nama.trim();
        document.getElementById('telp').value = telp.trim();
        document.getElementById('alamat').value = alamat.trim();
        document.getElementById('sizeSelect').value = area.classList.contains('w100') ? 'w100' : 'w58';
        
        sync();
    } catch (err) {
        alert("Gagal membaca clipboard. Pastikan izin aktif.");
    }
}
