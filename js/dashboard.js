// Vue.js Dashboard Component
new Vue({
    el: '#app',
    data: {
        currentUser: null,
        currentHour: new Date().getHours()
    },
    computed: {
        // Computed property untuk greeting message berdasarkan waktu
        greetingMessage() {
            if (!this.currentUser) return '';
            
            let greeting = '';
            if (this.currentHour < 11) {
                greeting = 'Selamat Pagi';
            } else if (this.currentHour < 15) {
                greeting = 'Selamat Siang';
            } else if (this.currentHour < 18) {
                greeting = 'Selamat Sore';
            } else {
                greeting = 'Selamat Malam';
            }
            
            return greeting + ', ' + this.currentUser.nama + '!';
        }
    },
    methods: {
        navigateTo(page) {
            window.location.href = page;
        },
        logout() {
            if (confirm('Apakah Anda yakin ingin logout?')) {
                sessionStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            }
        },
        showAlert(feature) {
            alert('Fitur ' + feature + ' akan segera tersedia!');
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
