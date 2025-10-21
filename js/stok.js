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

// Load table data on page load
window.onload = function() {
    loadTableData();
};

function loadTableData() {
    const tableBody = document.getElementById('stokTableBody');
    tableBody.innerHTML = '';
    
    dataBahanAjar.forEach((item, index) => {

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.cover}" alt="${item.namaBarang}" class="book-cover" onerror="this.onerror=null; this.src='img/placeholder.jpg';"></td>
            <td>${item.kodeLokasi}</td>
            <td>${item.kodeBarang}</td>
            <td>${item.namaBarang}</td>
            <td>${item.jenisBarang}</td>
            <td>${item.edisi}</td>
            <td>${item.stok}</td>
            <td><button class="btn-delete" onclick="deleteRow(${index})">Hapus</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Modal functions
function openAddModal() {
    document.getElementById('addModal').style.display = 'block';
}

function closeAddModal() {
    document.getElementById('addModal').style.display = 'none';
    document.getElementById('addStokForm').reset();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('addModal');
    if (event.target === modal) {
        closeAddModal();
    }
};

// Add new stock form
const addStokForm = document.getElementById('addStokForm');
addStokForm.onsubmit = function(e) {
    e.preventDefault();
    
    const newItem = {
        kodeLokasi: document.getElementById('kodeLokasi').value,
        kodeBarang: document.getElementById('kodeBarang').value,
        namaBarang: document.getElementById('namaBarang').value,
        jenisBarang: document.getElementById('jenisBarang').value,
        edisi: document.getElementById('edisi').value,
        stok: parseInt(document.getElementById('stok').value),
        cover: document.getElementById('cover').value
    };
    
    // Add to dataBahanAjar array
    dataBahanAjar.push(newItem);
    
    // Reload table
    loadTableData();
    
    // Close modal and reset form
    closeAddModal();
    
    // Show success alert
    alert('Bahan ajar berhasil ditambahkan!');
};

// Delete row function
function deleteRow(index) {
    if (confirm('Apakah Anda yakin ingin menghapus bahan ajar ini?')) {
        dataBahanAjar.splice(index, 1);
        loadTableData();
        alert('Bahan ajar berhasil dihapus!');
    }
}