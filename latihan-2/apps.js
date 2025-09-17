Vue.component('todo-list', {
  template: `
    <div>
      <p>ToDo Lists</p>
      <input
        type="text"
        v-model="baru"
        @keyup.enter="tambah"
        id="tulis"
        placeholder="Ketik Kegiatan di sini, lalu Enter" />

      <div v-show="tugas.length">
        <i>Daftar yang telah dibuat:</i>
        <table>
          <tr v-for="(t, index) in tugas" :key="index">
            <td>
              <input
                type="checkbox"
                :name="'cek_' + index"
                @click="selesai(index, t.status)"
                :checked="t.cek">
            </td>
            <td>
              <input
                type="text"
                v-model="t.kegiatan"
                :disabled="t.dis" />
            </td>
            <td>
              <button class="editing hijau" @click="edit(index, t.dis)">✏️</button>
              <button class="editing merah" @click="hapus(index)">❌</button>
            </td>
          </tr>
        </table>

        <table>
          <tr>
            <td>
              <button class="hapus" @click="hapusselesai">
                Hapus kegiatan yang telah diceklis
              </button>
            </td>
            <td>
              <button class="hapus" @click="hapussemua">
                Hapus semua kegiatan
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  `,
  data() {
    return {
      baru: '',
      tugas: []
    };
  },
  methods: {
    tambah() {
      if (this.baru === '') {
        alert('Silakan diisi dulu');
      } else {
        this.tugas.push({
          kegiatan: this.baru,
          cek: false,
          status: 'belum selesai',
          dis: true
        });
        this.baru = '';
      }
    },
    selesai(index, nilai) {
      if (nilai === 'belum selesai') {
        this.tugas[index].cek = true;
        this.tugas[index].status = 'selesai';
      } else {
        this.tugas[index].cek = false;
        this.tugas[index].status = 'belum selesai';
      }
    },
    edit(index, val) {
      if (val == true) {
        this.tugas[index].dis = false;
      } else {
        this.tugas[index].dis = true;
      }
    },
    hapus(index) {
      Vue.delete(this.tugas, index);
    },
    hapusselesai() {
      for (let i = this.tugas.length - 1; i >= 0; i--) {
        if (this.tugas[i].status === 'selesai') {
          Vue.delete(this.tugas, i);
        }
      }
    },
    hapussemua() {
      this.tugas = [];
    }
  }
});

new Vue({
  el: '#app'
});
