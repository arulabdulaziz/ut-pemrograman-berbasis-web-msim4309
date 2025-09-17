Vue.component('pemisah-nama', {
  template: `
    <div>
      <form>
        <input type="text" v-model="nama" placeholder="Program Pemisah Nama - ketikkan Nama Lengkap">
        <input type="button" @click="proses" value="Proses">
      </form>

      <transition name="v">
        <div id="hasil" v-if="hasil">
          <h3>
            Halo <i>{{ depan | kapital }}</i>, Berikut data anda:
          </h3>
          <p>Nama depan: {{ depan }}</p>
          <p>Nama tengah: {{ tengah }}</p>
          <p>Nama akhir: {{ akhir }}</p>
        </div>
      </transition>
    </div>
  `,
  data() {
    return {
      nama: '',
      depan: '',
      tengah: '',
      akhir: '',
      hasil: false
    }
  },
  methods: {
    proses() {
      const lengkap = this.nama.trim().split(' ');
      this.depan = lengkap[0] || '';
      this.akhir = lengkap.length > 1 ? lengkap[lengkap.length - 1] : '';
      this.tengah = '';

      for (let i = 1; i < lengkap.length - 1; i++) {
        this.tengah += lengkap[i] + ' ';
      }

      this.tengah = this.tengah.trim();
      this.hasil = true;
    }
  },
  filters: {
    kapital(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
});

var app = new Vue ({ el: '#app' });
