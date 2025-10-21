// Modal Management
const lupaPasswordModal = document.getElementById('lupaPasswordModal');
const daftarModal = document.getElementById('daftarModal');
const lupaPasswordLink = document.getElementById('lupaPasswordLink');
const daftarLink = document.getElementById('daftarLink');
const closeButtons = document.getElementsByClassName('close');

// Open modals
lupaPasswordLink.onclick = function(e) {
    e.preventDefault();
    lupaPasswordModal.style.display = 'block';
};

daftarLink.onclick = function(e) {
    e.preventDefault();
    daftarModal.style.display = 'block';
};

// Close modals
for (let closeBtn of closeButtons) {
    closeBtn.onclick = function() {
        const modalId = this.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'none';
    };
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

// Login Form Validation
const loginForm = document.getElementById('loginForm');
loginForm.onsubmit = function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate credentials
    const user = dataPengguna.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Save user to sessionStorage
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        
        // Show success alert
        alert('Login berhasil! Selamat datang, ' + user.nama);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        // Show error alert
        alert('Email atau password yang Anda masukkan salah!');
    }
};

// Lupa Password Form
const lupaPasswordForm = document.getElementById('lupaPasswordForm');
lupaPasswordForm.onsubmit = function(e) {
    e.preventDefault();
    
    const email = document.getElementById('emailReset').value;
    const user = dataPengguna.find(u => u.email === email);
    
    if (user) {
        alert('Link reset password telah dikirim ke email ' + email);
        lupaPasswordModal.style.display = 'none';
        document.getElementById('emailReset').value = '';
    } else {
        alert('Email tidak ditemukan dalam sistem!');
    }
};

// Daftar Form
const daftarForm = document.getElementById('daftarForm');
daftarForm.onsubmit = function(e) {
    e.preventDefault();
    
    const nama = document.getElementById('namaDaftar').value;
    const email = document.getElementById('emailDaftar').value;
    const password = document.getElementById('passwordDaftar').value;
    const role = document.getElementById('roleDaftar').value;
    const lokasi = document.getElementById('lokasiDaftar').value;
    
    // Check if email already exists
    const existingUser = dataPengguna.find(u => u.email === email);
    if (existingUser) {
        alert('Email sudah terdaftar! Silakan gunakan email lain.');
        return;
    }
    
    // Add new user
    const newUser = {
        id: dataPengguna.length + 1,
        nama: nama,
        email: email,
        password: password,
        role: role,
        lokasi: lokasi
    };
    
    dataPengguna.push(newUser);
    
    alert('Pendaftaran berhasil! Silakan login dengan akun Anda.');
    daftarModal.style.display = 'none';
    daftarForm.reset();
};