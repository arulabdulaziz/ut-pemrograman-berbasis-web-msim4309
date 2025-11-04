// Vue.js Stok Component
new Vue({
    el: '#app',
    data: {
        currentUser: null,
        bahanAjar: [...dataBahanAjar],
        showAddModal: false,
        searchFilter: '',
        newItem: {
            kodeLokasi: '',
            kodeBarang: '',
            namaBarang: '',
            jenisBarang: '',
            edisi: '',
            stok: 0,
            cover: ''
        }
    },
    computed: {
        // Computed property untuk user info
        userInfo() {
            if (!this.currentUser) return '';
            return this.currentUser.nama + ' (' + this.currentUser.role + ')';
        },
        // Computed property untuk filtered bahan ajar
        filteredBahanAjar() {
            if (!this.searchFilter) return this.bahanAjar;
            
            const query = this.searchFilter.toLowerCase();
            return this.bahanAjar.filter(item => {
                return item.namaBarang.toLowerCase().includes(query) ||
                       item.kodeBarang.toLowerCase().includes(query) ||
                       item.kodeLokasi.toLowerCase().includes(query);
            });
        },
        // Computed property untuk total items
        totalItems() {
            return this.filteredBahanAjar.length;
        },
        // Computed property untuk total stok
        totalStok() {
            return this.filteredBahanAjar.reduce((sum, item) => sum + item.stok, 0);
        }
    },
    methods: {
        openAddModal() {
            this.showAddModal = true;
        },
        closeAddModal() {
            this.showAddModal = false;
            // Reset form
            this.newItem = {
                kodeLokasi: '',
                kodeBarang: '',
                namaBarang: '',
                jenisBarang: '',
                edisi: '',
                stok: 0,
                cover: ''
            };
        },
        handleAddItem() {
            // Add new item to array
            this.bahanAjar.push({ ...this.newItem });
            
            // Show success alert
            alert('Bahan ajar berhasil ditambahkan!');
            
            // Close modal
            this.closeAddModal();
        },
        deleteItem(index) {
            if (confirm('Apakah Anda yakin ingin menghapus bahan ajar ini?')) {
                // Get the actual index in bahanAjar array
                const item = this.filteredBahanAjar[index];
                const actualIndex = this.bahanAjar.findIndex(i => 
                    i.kodeBarang === item.kodeBarang && i.kodeLokasi === item.kodeLokasi
                );
                
                if (actualIndex !== -1) {
                    this.bahanAjar.splice(actualIndex, 1);
                    alert('Bahan ajar berhasil dihapus!');
                }
            }
        },
        stockClass(stok) {
            if (stok < 100) return 'stock-low';
            if (stok < 300) return 'stock-medium';
            return 'stock-high';
        },
        handleImageError(event) {
            event.target.src = 'img/placeholder.jpg';
        },
        goToDashboard() {
            window.location.href = 'dashboard.html';
        },
        logout() {
            if (confirm('Apakah Anda yakin ingin logout?')) {
                sessionStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            }
        },
        checkAuth() {
            const userStr = sessionStorage.getItem('currentUser');
            if (!userStr) {
                window.location.href = 'index.html';
                return;
            }
            this.currentUser = JSON.parse(userStr);
        }
    },
    mounted() {
        this.checkAuth();
    }
});
