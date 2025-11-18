Vue.component("order-form", {
  props: ["paketList"],
  template: `
    <div>
      <h3>Form Pemesanan Cepat</h3>
      <form @submit.prevent="submitOrder" @keydown.enter.prevent="submitOrder">
        <div class="form-row">
          <div class="form-group">
            <label>Pilih Paket</label>
            <select v-model="selectedPaket" required>
              <option value="">-- pilih --</option>
              <option v-for="p in paketList" :key="p.kode" :value="p.kode">{{ p.kode }} — {{ p.nama }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Jumlah Paket</label>
            <input type="number" v-model.number="jumlah" min="1" />
          </div>
        </div>

        <div v-if="paket">
          <h4>Isi Paket</h4>
          <ul>
            <li v-for="(i,idx) in paket.isi" :key="idx">{{ i }}</li>
          </ul>
          <div class="small">Harga satuan: <strong>{{ paket.harga | currency }}</strong></div>
          <div class="small">Total: <strong>{{ total | currency }}</strong></div>
        </div>

        <div style="margin-top:12px">
          <button class="btn btn-primary" type="submit">Buat Pesanan</button>
        </div>
      </form>
    </div>
  `,
  data() {
    return { selectedPaket: "", paket: null, jumlah: 1 };
  },
  computed: {
    total() {
      return (this.paket ? this.paket.harga : 0) * (this.jumlah || 1);
    },
  },
  methods: {
    submitOrder() {
      if (!this.selectedPaket) {
        alert("Pilih paket");
        return;
      }
      const payload = {
        paket: this.selectedPaket,
        jumlah: this.jumlah,
        total: this.total,
        waktu: new Date().toISOString(),
      };
      alert("Pesanan dibuat: " + JSON.stringify(payload));
      this.$emit("create-order", payload);

      // reset input
      this.selectedPaket = "";
      this.jumlah = 1;
      this.paket = null;
    },
  },
  watch: {
    selectedPaket(v) {
      this.paket = this.paketList.find((p) => p.kode === v) || null;
    },
  },
  filters: {
    currency(v) {
      return "Rp " + Number(v).toLocaleString("id-ID");
    },
  },
});
