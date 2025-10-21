// Check if user is logged in
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = 'index.html';
}

// Display user info
document.getElementById('userInfo').textContent = currentUser.nama + ' (' + currentUser.role + ')';

// Generate greeting based on time
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 11) {
        return 'Selamat Pagi';
    } else if (hour < 15) {
        return 'Selamat Siang';
    } else if (hour < 18) {
        return 'Selamat Sore';
    } else {
        return 'Selamat Malam';
    }
}

document.getElementById('greeting').textContent = getGreeting() + ', ' + currentUser.nama + '!';

// Navigation function
function navigateTo(page) {
    window.location.href = page;
}

// Logout function
function logout() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}