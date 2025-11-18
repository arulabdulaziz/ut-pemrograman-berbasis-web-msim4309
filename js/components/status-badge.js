Vue.component("status-badge", {
  props: ["qty", "safety"],
  computed: {
    status() {
      const q = Number(this.qty);
      const s = Number(this.safety);
      if (q === 0) return "kosong";
      if (q < s) return "menipis";
      return "aman";
    },
    className() {
      return {
        "status-aman": this.status === "aman",
        "status-warning": this.status === "menipis",
        "status-empty": this.status === "kosong",
      };
    },
    label() {
      if (this.status === "aman") return "Aman";
      if (this.status === "menipis") return "Menipis";
      return "Kosong";
    },
  },
  template: `<span :class="['status-badge', className]">{{ label }}</span>`,
});
