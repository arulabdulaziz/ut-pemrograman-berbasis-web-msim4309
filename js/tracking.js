// Check if user is logged in
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = 'index.html';
}

// Display user info
document.getElementById('userInfo').textContent = currentUser.nama + ' (' + currentUser.role + ')';

// Logout function
function logout() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}

// Go to dashboard
function goToDashboard() {
    window.location.href = 'dashboard.html';
}

// Tracking form submission
const trackingForm = document.getElementById('trackingForm');
trackingForm.onsubmit = function(e) {
    e.preventDefault();
    
    const nomorDO = document.getElementById('nomorDO').value.trim();
    
    // Search in dataTracking
    const tracking = dataTracking[nomorDO];
    
    if (tracking) {
        // Display tracking result
        displayTrackingResult(tracking);
    } else {
        alert('Nomor Delivery Order tidak ditemukan!\nSilakan periksa kembali nomor DO Anda.');
    }
};

function displayTrackingResult(tracking) {
    // Show result container
    const resultContainer = document.getElementById('trackingResult');
    resultContainer.style.display = 'block';
    
    // Fill tracking info
    document.getElementById('resultNomorDO').textContent = tracking.nomorDO;
    document.getElementById('resultNama').textContent = tracking.nama;
    document.getElementById('resultStatus').textContent = tracking.status;
    document.getElementById('resultEkspedisi').textContent = tracking.ekspedisi;
    document.getElementById('resultTanggal').textContent = tracking.tanggalKirim;
    document.getElementById('resultPaket').textContent = tracking.paket;
    document.getElementById('resultTotal').textContent = tracking.total;
    
    // Update progress bar based on status
    updateProgressBar(tracking.status);
    
    // Display timeline
    displayTimeline(tracking.perjalanan);
    
    // Scroll to result
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateProgressBar(status) {
    const progressFill = document.getElementById('progressFill');
    let percentage = 0;
    
    switch(status) {
        case 'Diterima':
            percentage = 25;
            break;
        case 'Dalam Proses':
        case 'Dalam Perjalanan':
            percentage = 50;
            break;
        case 'Dikirim':
            percentage = 75;
            break;
        case 'Selesai':
            percentage = 100;
            break;
        default:
            percentage = 25;
    }
    
    progressFill.style.width = percentage + '%';
}

function displayTimeline(perjalanan) {
    const timelineContainer = document.getElementById('timelineContainer');
    timelineContainer.innerHTML = '';
    
    // Display timeline items in reverse order (newest first)
    for (let i = perjalanan.length - 1; i >= 0; i--) {
        const item = perjalanan[i];
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-time">${item.waktu}</div>
            <div class="timeline-desc">${item.keterangan}</div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    }
}