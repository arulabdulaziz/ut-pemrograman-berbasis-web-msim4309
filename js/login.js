// Vue.js Login Component
new Vue({
  el: "#app",
  data: {
    loginForm: {
      email: "",
      password: "",
      emailValid: true,
    },
    resetEmail: "",
    emailResetValid: true,
    daftarForm: {
      nama: "",
      email: "",
      password: "",
      role: "",
      lokasi: "",
      emailValid: true,
    },
    showLupaPasswordModal: false,
    showDaftarModal: false,
    dataPengguna: dataPengguna,
  },
  methods: {
    handleLogin() {
      // Validate credentials
      const user = this.dataPengguna.find(
        (u) =>
          u.email === this.loginForm.email &&
          u.password === this.loginForm.password
      );

      if (user) {
        // Save user to sessionStorage
        sessionStorage.setItem("currentUser", JSON.stringify(user));

        // Show success alert
        alert("Login berhasil! Selamat datang, " + user.nama);

        // Redirect to dashboard
        window.location.href = "dashboard.html";
      } else {
        // Show error alert
        alert("Email atau password yang Anda masukkan salah!");
      }
    },
    handleLupaPassword() {
      const user = this.dataPengguna.find((u) => u.email === this.resetEmail);

      if (user) {
        alert("Link reset password telah dikirim ke email " + this.resetEmail);
        this.showLupaPasswordModal = false;
        this.resetEmail = "";
      } else {
        alert("Email tidak ditemukan dalam sistem!");
      }
    },
    handleDaftar() {
      // Check if email already exists
      const existingUser = this.dataPengguna.find(
        (u) => u.email === this.daftarForm.email
      );

      if (existingUser) {
        alert("Email sudah terdaftar! Silakan gunakan email lain.");
        return;
      }

      // Add new user
      const newUser = {
        id: this.dataPengguna.length + 1,
        nama: this.daftarForm.nama,
        email: this.daftarForm.email,
        password: this.daftarForm.password,
        role: this.daftarForm.role,
        lokasi: this.daftarForm.lokasi,
      };

      this.dataPengguna.push(newUser);

      alert("Pendaftaran berhasil! Silakan login dengan akun Anda.");
      this.showDaftarModal = false;

      // Reset form
      this.daftarForm = {
        nama: "",
        email: "",
        password: "",
        role: "",
        lokasi: "",
      };
    },
  },
  mounted() {
    // Check if already logged in
    const currentUser = sessionStorage.getItem("currentUser");
    if (currentUser) {
      window.location.href = "dashboard.html";
    }
  },
  watch: {
    "loginForm.email"(newVal) {
      // Cek apakah format email valid
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.loginForm.emailValid = emailPattern.test(newVal);
    },
    resetEmail(newVal) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailResetValid = emailPattern.test(newVal);
    },
    "daftarForm.email"(newVal) {
        // Cek apakah format email valid
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.daftarForm.emailValid = emailPattern.test(newVal);
      },
  },
});
