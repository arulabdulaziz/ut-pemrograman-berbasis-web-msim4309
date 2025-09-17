Vue.component('calculator-app', {
  template: `
    <div>
      <form>
        <input id="layar" type="text" v-model="tampil" readonly>

        <input id="ac" type="button" value="AC" @click="reset">
        
        <input class="operator" type="button"
          v-for="o in operator"
          :key="'op-' + o"
          :value="o"
          @click="pesan(o)">
        
        <input class="angka" type="button"
          v-for="a in angka"
          :key="'num-' + a"
          :value="a"
          @click="pesan(a)">
        
        <input class="angka" id="koma" type="button" :value="coma" @click="tambahKoma">
        
        <input id="hasil" type="button" value="=" @click="hasil">
      </form>
    </div>
  `,
  data() {
    return {
      angka: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      operator: ['+', '-', '*', '/'],
      coma: '.',
      tampil: ''
    };
  },
  methods: {
    pesan(nilai) {
      this.tampil += nilai;
    },
    hasil() {
      try {
        this.tampil = eval(this.tampil).toString();
      } catch {
        this.tampil = 'Error';
      }
    },
    reset() {
      this.tampil = '';
    },
    tambahKoma() {
      // Tambahkan koma jika karakter terakhir bukan koma
      if (!this.tampil.endsWith('.')) {
        this.tampil += '.';
      }
    }
  }
});

new Vue({
  el: '#app'
});
