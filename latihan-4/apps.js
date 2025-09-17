Vue.component('ubah-menu', {
  template: `
    <div>
      <div :class="menu" id="menu">
        <a href="#">🏠 Home</a>
        <a href="#">🏡 Profile</a>
        <a href="#">🚗 Service</a>
        <a href="#">🎭 About Us</a>
      </div>
      <form id="control">
        <p>Pilih Model Menu</p>
        <input type="radio" name="menu" @click="ubah(1)"> Kiri
        <input type="radio" name="menu" @click="ubah(2)"> Atas
        <input type="radio" name="menu" @click="ubah(3)"> Kanan
        <input type="radio" name="menu" @click="ubah(4)"> Bawah
      </form>
    </div>
  `,
  data() {
    return {
      menu: ''
    };
  },
  methods: {
    ubah(nomor) {
      this.menu = 'menu' + nomor;
    }
  }
});

new Vue({
  el: '#app'
});
