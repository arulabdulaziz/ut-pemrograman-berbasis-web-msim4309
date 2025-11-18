const ApiService = {
  loadData(path = "data/dataBahanAjar.json") {
    return fetch(path).then((res) => {
      if (!res.ok) throw new Error("Gagal memuat data: " + res.status);
      return res.json();
    });
  },
};

window.ApiService = ApiService;
