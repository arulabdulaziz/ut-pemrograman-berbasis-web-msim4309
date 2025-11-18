new Vue({
  el:'#app',
  data(){
    return {
      tab: 'stok',
      data: {},
      loading: true
    };
  },
  created(){
    ApiService.loadData('data/dataBahanAjar.json')
      .then(json=>{
        this.data = json;
      })
      .catch(err=>{
        console.error(err);
        alert('Gagal memuat data. Cek console.');
        this.data = { upbjjList:[], kategoriList:[], pengirimanList:[], paket:[], stok:[], tracking:[] };
      })
      .finally(()=>this.loading=false);
  },
  methods:{
    onUpdateStok(newStok){
    },
    onSaveDO(payload){
    },
    onCreateOrder(payload){
    }
  },
  filters:{
    currency(v){ return 'Rp ' + Number(v).toLocaleString('id-ID'); }
  }
});
