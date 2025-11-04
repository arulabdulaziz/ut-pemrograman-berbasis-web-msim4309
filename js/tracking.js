// Vue.js Tracking Component
new Vue({
    el: '#app',
    data: {
        currentUser: null,
        searchQuery: '',
        trackingResult: null,
        searched: false,
        dataTracking: dataTracking
    },
    computed: {
        // Computed property untuk user info
        userInfo() {
            if (!this.currentUser) return '';
            return this.currentUser.nama + ' (' + this.currentUser.role + ')';
        },
        // Computed property untuk progress percentage
        progressPercentage() {
            if (!this.trackingResult) return 0;
            
            const status = this.trackingResult.status;
            switch(status) {
                case 'Diterima':
                    return 25;
                case 'Dalam Proses':
                case 'Dalam Perjalanan':
                    return 50;
                case 'Dikirim':
                    return 75;
                case 'Selesai':
                    return 100;
                default:
                    return 25;
            }
        },
        // Computed property untuk reversed timeline
        reversedTimeline() {
            if (!this.trackingResult || !this.trackingResult.perjalanan) return [];
            return [...this.trackingResult.perjalanan].reverse();
        },
        // Computed property untuk status class
        statusClass() {
            if (!this.trackingResult) return '';
            
            const status = this.trackingResult.status;
            if (status === 'Selesai') return 'status-success';
            if (status === 'Dikirim') return 'status-info';
            if (status === 'Dalam Perjalanan' || status === 'Dalam Proses') return 'status-warning';
            return '';
        }
    },
    watch: {
        // Watcher untuk tracking result
        trackingResult(newVal) {
            if (newVal) {
                console.log('Tracking result updated:', newVal.nomorDO);
                // Scroll to result
                this.$nextTick(() => {
                    const resultElement = document.querySelector('.tracking-result');
                    if (resultElement) {
                        resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            }
        }
    },
    methods: {
        searchTracking() {
            this.searched = true;
            const nomorDO = this.searchQuery.trim();
            
            // Search in dataTracking
            const tracking = this.dataTracking[nomorDO];
            
            if (tracking) {
                this.trackingResult = tracking;
            } else {
                this.trackingResult = null;
                alert('Nomor Delivery Order tidak ditemukan!\nSilakan periksa kembali nomor DO Anda.');
            }
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
