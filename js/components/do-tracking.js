Vue.component("do-tracking", {
  props: ["trackingData", "upbjjList", "paketList", "pengirimanList"],
  template: `
    <div>
      <div class="controls">
        <div>
          <input v-model="query" @keydown.enter.prevent="search" @keydown.esc.prevent="clearQuery" placeholder="Cari Nomor DO atau NIM" />
          <button class="btn btn-primary" @click="search">Cari</button>
          <button class="btn btn-ghost" @click="clearQuery">Reset</button>
        </div>
        <div style="margin-left:auto">
          <button class="btn btn-primary" @click="openAddForm">+ Tambah DO</button>
        </div>
      </div>

      <div v-if="found.length">
        <h3>Hasil Pencarian ({{ found.length }})</h3>
        <div v-for="(item, idx) in found" :key="idx" style="margin-bottom:12px;background:#fff;padding:12px;border-radius:6px;border:1px solid #eef2f7">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <strong>{{ item.no }}</strong> — {{ item.nama }} ({{ item.nim }}) 
              <div class="small">Ekspedisi: {{ item.ekspedisi }} | Tanggal: {{ formatDate(item.tanggalKirim) }} | Paket: {{ item.paket }}</div>
            </div>
            <div>
              <status-badge :qty="1" :safety="0" v-if="false"></status-badge>
              <button class="btn btn-ghost" @click="openTimeline(item)">Timeline</button>
            </div>
          </div>

          <div style="margin-top:8px">
            <div v-for="(p,i) in item.perjalanan" :key="i" class="small">- {{ p.waktu }} — {{ p.keterangan }}</div>
          </div>
        </div>
      </div>
      <div v-else class="small">Tidak ditemukan data (kosong)</div>

      <!-- Add DO Modal -->
      <div v-if="showAdd" class="modal-overlay" @click.self="closeAdd">
        <div class="modal-box">
          <button class="modal-close" @click="closeAdd">&times;</button>
          <h3>Tambah Delivery Order</h3>
          <form @submit.prevent="createDO" @keydown.enter.prevent="createDO" @keydown.esc.prevent="closeAdd">
            <div class="form-row">
              <div class="form-group">
                <label>NIM</label>
                <input v-model="form.nim" required />
              </div>
              <div class="form-group">
                <label>Nama</label>
                <input v-model="form.nama" required />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Ekspedisi</label>
                <select v-model="form.ekspedisi" required>
                  <option v-for="p in pengirimanList" :value="p.kode" :key="p.kode">{{ p.nama }}</option>
                </select>
              </div>

              <div class="form-group">
                <label>Paket</label>
                <select v-model="form.paket" required>
                  <option value="">Pilih paket</option>
                  <option v-for="pk in paketList" :value="pk.kode" :key="pk.kode">{{ pk.kode }} — {{ pk.nama }}</option>
                </select>
              </div>

              <div class="form-group">
                <label>Tanggal Kirim</label>
                <input type="date" v-model="form.tanggalKirim" />
              </div>
            </div>

            <div v-if="paketDetail">
              <h4>Detail Paket</h4>
              <ul>
                <li v-for="(kd,i) in paketDetail.isi" :key="i">{{ kd }}</li>
              </ul>
              <div class="small">Total: <strong>{{ paketDetail.harga | currency }}</strong></div>
            </div>

            <div class="input-perjalanan">
              <div v-for="(p,i) in form.perjalanan" :key="i" class="small">- {{ p.waktu | formatWaktuPerjalanan }} — {{ p.keterangan }}</div>
            </div>

            <div class="form-group">
              <label>Catatan Perjalanan (tambah entry)</label>
              <input v-model="perjalananKeterangan" placeholder="Keterangan" />
              <button type="button" class="btn btn-ghost" @click="addPerjalanan">Tambah Progress</button>
            </div>

            <div style="display:flex;gap:8px;justify-content:flex-end">
              <button class="btn btn-ghost" type="button" @click="closeAdd">Batal</button>
              <button class="btn btn-primary" type="submit">Simpan DO</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Timeline modal -->
      <div v-if="showTimeline" class="modal-overlay" @click.self="closeTimeline">
        <div class="modal-box">
          <button class="modal-close" @click="closeTimeline">&times;</button>
          <h3>Timeline: {{ timelineItem.no }}</h3>
          <div v-for="(p,i) in timelineItem.perjalanan" :key="i" class="small">- {{ p.waktu | formatWaktuPerjalanan }} — {{ p.keterangan }}</div>

          <div style="margin-top:12px">
            <input v-model="newTimelineNote" placeholder="Keterangan baru" @keydown.enter.prevent="pushTimeline" />
            <button class="btn btn-primary" @click="pushTimeline">Tambah</button>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      query: "",
      found: [],
      showAdd: false,
      form: {
        nim: "",
        nama: "",
        ekspedisi: "REG",
        paket: "",
        tanggalKirim: this.todayISO(),
        perjalanan: [],
        total: 0,
      },
      paketDetail: null,
      perjalananKeterangan: "",
      showTimeline: false,
      timelineItem: null,
      newTimelineNote: "",
    };
  },
  methods: {
    search() {
      const q = this.query.trim();
      if (!q) {
        this.found = [];
        return;
      }
      // cari berdasarkan kode DO atau NIM
      const res = [];
      (this.trackingData || []).forEach((obj) => {
        for (const key in obj) {
          const val = obj[key];
          if (key.includes(q) || (val.nim && val.nim.includes(q))) {
            res.push(Object.assign({ no: key }, val));
          }
        }
      });
      this.found = res;
    },
    clearQuery() {
      this.query = "";
      this.found = [];
    },
    openAddForm() {
      this.showAdd = true;
      this.form = {
        nim: "",
        nama: "",
        ekspedisi: this.pengirimanList[0]?.kode || "REG",
        paket: "",
        tanggalKirim: this.todayISO(),
        perjalanan: [],
        total: 0,
      };
      this.paketDetail = null;
    },
    closeAdd() {
      this.showAdd = false;
      this.perjalananKeterangan = "";
    },
    createDO() {
      const year = new Date().getFullYear();
      const base = "DO" + year + "-";
      let seq = 1;
      (this.trackingData || []).forEach((obj) => {
        for (const k in obj) {
          if (k.startsWith("DO" + year + "-")) seq++;
        }
      });
      const seqStr = String(seq).padStart(4, "0");
      const doNo = base + seqStr;
      const payload = {};
      payload[doNo] = {
        nim: this.form.nim,
        nama: this.form.nama,
        status: "Diterima",
        ekspedisi: this.form.ekspedisi,
        tanggalKirim: this.form.tanggalKirim,
        paket: this.form.paket,
        total: this.paketDetail ? this.paketDetail.harga : 0,
        perjalanan: (this.form.perjalanan || []).slice(),
      };
      // push to trackingDat
      this.trackingData.push(payload);
      alert("DO berhasil dibuat: " + doNo);
      this.$emit("save-do", payload);
      this.closeAdd();
    },
    openTimeline(item) {
      this.timelineItem = item;
      this.showTimeline = true;
    },
    closeTimeline() {
      this.showTimeline = false;
      this.timelineItem = null;
      this.newTimelineNote = "";
    },
    pushTimeline() {
      if (!this.newTimelineNote) return;
      const waktu = this.nowString();
      if (!this.timelineItem.perjalanan) this.timelineItem.perjalanan = [];
      this.timelineItem.perjalanan.push({
        waktu,
        keterangan: this.newTimelineNote,
      });
      this.newTimelineNote = "";
    },
    addPerjalanan() {
      if (!this.perjalananKeterangan) return;
      const waktu = this.nowString();
      console.log(waktu)
      this.form.perjalanan.push({
        waktu,
        keterangan: this.perjalananKeterangan,
      });
      this.perjalananKeterangan = "";
    },
    formatDate(d) {
      if (!d) return "";
      const dt = new Date(d);
      const opts = { day: "numeric", month: "long", year: "numeric" };
      return dt.toLocaleDateString("id-ID", opts);
    },
    todayISO() {
      return new Date().toISOString().slice(0, 10);
    },
    nowString() {
      const now = new Date();

      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
    
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
    
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
  },
  watch: {
    // ketika pilih paket -> tampilkan detail paket & total harga
    "form.paket"(val) {
      this.paketDetail = this.paketList.find((p) => p.kode === val) || null;
      if (this.paketDetail) this.form.total = this.paketDetail.harga;
    },
  },
  filters: {
    currency(v) {
      return "Rp " + Number(v).toLocaleString("id-ID");
    },
    formatWaktuPerjalanan(datetimeString) {
      const bulanIndo = [
          "Januari", "Februari", "Maret", "April", "Mei", "Juni",
          "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];

      const [tanggalPart, waktuPart] = datetimeString.split(" ");
      const [tahun, bulan, tanggal] = tanggalPart.split("-");

      const namaBulan = bulanIndo[parseInt(bulan) - 1];

      return `${tanggal} ${namaBulan} ${tahun} ${waktuPart}`;
    }
  },
});
