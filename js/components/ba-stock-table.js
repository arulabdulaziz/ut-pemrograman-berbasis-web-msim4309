Vue.component("ba-stock-table", {
  props: ["stokData", "upbjjList", "kategoriList"],
  template: `
    <div>
      <div class="controls">
        <div class="filter-box">
          <label class="small">UT-Daerah</label>
          <select v-model="filters.upbjj">
            <option value="">[Semua]</option>
            <option v-for="u in upbjjList" :key="u" :value="u">{{ u }}</option>
          </select>
        </div>

        <div class="filter-box" v-if="filters.upbjj">
          <label class="small">Kategori</label>
          <select v-model="filters.kategori">
            <option value="">[Semua]</option>
            <option v-for="k in kategoriOptions" :key="k" :value="k">{{ k }}</option>
          </select>
        </div>

        <div class="filter-box">
          <label class="small">Status Reorder</label>
          <select v-model="filters.reorder">
            <option value="">[Semua]</option>
            <option value="belowSafety">Stok &lt; Safety</option>
            <option value="zero">Stok = 0</option>
          </select>
        </div>

        <div class="filter-box">
          <label class="small">Sort</label>
          <select v-model="sortKey">
            <option value="">Default</option>
            <option value="judul">Judul</option>
            <option value="qty">Stok</option>
            <option value="harga">Harga</option>
          </select>
          <button class="btn btn-ghost" @click="toggleSortDir">⇅</button>
        </div>

        <div style="margin-left:auto">
          <button class="btn btn-primary" @click="openAdd">+ Tambah</button>
          <button class="btn btn-ghost" @click="resetFilters">Reset</button>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>Kode</th>
            <th>Judul</th>
            <th>Kategori</th>
            <th>UT-Daerah</th>
            <th>Lokasi Rak</th>
            <th>Harga</th>
            <th>Qty</th>
            <th>Safety</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in displayed" :key="item.kode">
            <td>{{ item.kode }}</td>
            <td>{{ item.judul }}</td>
            <td>{{ item.kategori }}</td>
            <td>{{ item.upbjj }}</td>
            <td>{{ item.lokasiRak }}</td>
            <td>{{ item.harga | currency }}</td>
            <td>{{ item.qty | unit }}</td>
            <td>{{ item.safety | unit }}</td>
            <td>
              <div class="tooltip">
                <status-badge :qty="item.qty" :safety="item.safety"></status-badge>
                <div class="tooltip-content" v-html="item.catatanHTML"></div>
              </div>
            </td>
            <td>
              <button class="btn btn-ghost" @click="openEdit(idx)">Edit</button>
              <button class="btn" @click="remove(idx)">Hapus</button>
            </td>
          </tr>
          <tr v-if="displayed.length===0"><td colspan="10" class="center small">Tidak ada data</td></tr>
        </tbody>
      </table>

      <!-- Add / Edit Modal -->
      <div v-if="showForm" class="modal-overlay" @click.self="closeForm">
        <div class="modal-box">
          <button class="modal-close" @click="closeForm">&times;</button>
          <h3>{{ editIndex===null ? 'Tambah Bahan Ajar' : 'Edit Bahan Ajar' }}</h3>
          <form @submit.prevent="saveItem" @keydown.enter.prevent="saveItem">
            <div class="form-row">
              <div class="form-group">
                <label>Kode</label>
                <input v-model="form.kode" required/>
              </div>
              <div class="form-group">
                <label>Judul</label>
                <input v-model="form.judul" required/>
              </div>
              <div class="form-group">
                <label>Kategori</label>
                <select v-model="form.kategori" required>
                  <option v-for="k in kategoriList" :key="k" :value="k">{{ k }}</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>UT-Daerah</label>
                <select v-model="form.upbjj" required>
                  <option v-for="u in upbjjList" :key="u" :value="u">{{ u }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>Lokasi Rak</label>
                <input v-model="form.lokasiRak"/>
              </div>
              <div class="form-group">
                <label>Harga</label>
                <input type="number" v-model.number="form.harga" required/>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Qty</label>
                <input type="number" v-model.number="form.qty" required/>
              </div>
              <div class="form-group">
                <label>Safety</label>
                <input type="number" v-model.number="form.safety" required/>
              </div>
            </div>

            <div class="form-group">
              <label>Catatan (HTML allowed)</label>
              <textarea v-model="form.catatanHTML"></textarea>
            </div>

            <div style="display:flex;gap:8px;justify-content:flex-end">
              <button class="btn btn-ghost" type="button" @click="closeForm">Batal</button>
              <button class="btn btn-primary" type="submit">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      filters: { upbjj: "", kategori: "", reorder: "" },
      sortKey: "",
      sortDir: 1,
      showForm: false,
      editIndex: null,
      form: this.emptyForm(),
    };
  },
  computed: {
    kategoriOptions() {
      if (!this.filters.upbjj) return this.kategoriList;
      const set = new Set(
        this.stokData
          .filter((s) => s.upbjj === this.filters.upbjj)
          .map((x) => x.kategori)
      );
      return Array.from(set);
    },
    displayed() {
      let arr = this.stokData.slice();

      // filter upbjj
      if (this.filters.upbjj)
        arr = arr.filter((i) => i.upbjj === this.filters.upbjj);

      // filter kategori
      if (this.filters.kategori)
        arr = arr.filter((i) => i.kategori === this.filters.kategori);

      // filter reorder
      if (this.filters.reorder === "belowSafety")
        arr = arr.filter((i) => i.qty < i.safety);
      if (this.filters.reorder === "zero") arr = arr.filter((i) => i.qty === 0);

      // sort
      if (this.sortKey) {
        arr.sort((a, b) => {
          let av = a[this.sortKey],
            bv = b[this.sortKey];
          if (typeof av === "string") av = av.toLowerCase();
          if (typeof bv === "string") bv = bv.toLowerCase();
          if (av < bv) return -1 * this.sortDir;
          if (av > bv) return 1 * this.sortDir;
          return 0;
        });
      }

      return arr;
    },
  },
  filters: {
    currency(value) {
      return "Rp " + Number(value).toLocaleString("id-ID");
    },
    unit(value) {
      return value + " buah";
    },
  },
  methods: {
    emptyForm() {
      return {
        kode: "",
        judul: "",
        kategori: this.kategoriList[0] || "",
        upbjj: this.upbjjList[0] || "",
        lokasiRak: "",
        harga: 0,
        qty: 0,
        safety: 0,
        catatanHTML: "",
      };
    },
    toggleSortDir() {
      this.sortDir = this.sortDir * -1;
    },
    resetFilters() {
      this.filters = { upbjj: "", kategori: "", reorder: "" };
      this.sortKey = "";
      this.sortDir = 1;
    },
    openAdd() {
      this.editIndex = null;
      this.form = this.emptyForm();
      this.showForm = true;
      this.$nextTick(() => document.querySelector(".modal-box input")?.focus());
    },
    openEdit(idx) {
      this.editIndex = idx;
      this.form = Object.assign({}, this.stokData[idx]);
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
      this.editIndex = null;
      this.form = this.emptyForm();
    },
    saveItem() {
      // basic validation
      if (!this.form.kode || !this.form.judul) {
        alert("Isi kode & judul");
        return;
      }
      // create or update
      if (this.editIndex === null) {
        // ensure unique kode
        if (this.stokData.find((s) => s.kode === this.form.kode)) {
          alert("Kode sudah ada");
          return;
        }
        this.stokData.push(Object.assign({}, this.form));
      } else {
        Vue.set(this.stokData, this.editIndex, Object.assign({}, this.form));
      }
      this.closeForm();
    },
    remove(idx) {
      if (confirm("Hapus data bahan ajar ini?")) {
        this.stokData.splice(idx, 1);
      }
    },
  },
  watch: {
    // ketika pilih upbjj, maka tampil filter kategori
    "filters.upbjj"(val) {
      this.filters.kategori = "";
    },
  },
});
