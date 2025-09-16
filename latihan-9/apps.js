var app = new Vue({
  el: '#app',
  data: {
      bill: '',
      bil2: '',
      operasi: null
  },
  computed: {
      hasil() {
          // Validasi input sebelum dihitung
          let a = parseFloat(this.bill);
          let b = parseFloat(this.bil2);
          let op = this.operasi;

          if (isNaN(a) || isNaN(b) || !op) return 'Invalid Input';

          // Lakukan perhitungan aman (tanpa eval)
          switch (op) {
              case '+': return a + b;
              case '-': return a - b;
              case '*': return a * b;
              case '/': return b !== 0 ? (a / b) : '∞';
              default: return 'Operasi tidak dikenal';
          }
      }
  }
});
