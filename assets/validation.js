document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Menghentikan pengiriman formulir secara default

    // Memeriksa apakah semua field telah diisi
    if (validateForm()) {
    showNotification('Berhasil mengirim formulir!');
    document.getElementById('registerForm').reset(); // Mengosongkan formulir setelah pengiriman berhasil
    }
});

function validateForm() {
    var nim = document.getElementById('nim').value;
    var nama = document.getElementById('nama').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    var jurusan = document.getElementById('jurusan').value;

    // Memeriksa apakah semua field telah diisi
    if (
        nim === '' ||
        nama === '' ||
        jurusan === '' ||
        email === '' ||
        password === ''
    ) {
        alert('Mohon lengkapi semua field.');
        return false;
    }

    return true;
    }

    function showNotification(message) {
    // Membuat elemen notifikasi
    var notification = document.createElement('div');
    notification.innerText = message;
    notification.classList.add('notification');

    // Menambahkan notifikasi ke dalam body
    document.body.appendChild(notification);

    // Menghilangkan notifikasi setelah 3 detik
    setTimeout(function () {
        document.body.removeChild(notification);
    }, 3000);
}
