Vue.component("app-modal", {
  template: `
    <div v-if="visible" class="modal-overlay" @keydown.esc="hide" tabindex="0">
      <div class="modal-box" role="dialog" aria-modal="true">
        <button class="modal-close" @click="hide">&times;</button>
        <div v-html="content"></div>
      </div>
    </div>
  `,
  data() {
    return { visible: false, content: "" };
  },
  methods: {
    show(html) {
      this.content = html;
      this.visible = true;
      this.$nextTick(() => this.$el.focus());
    },
    hide() {
      this.visible = false;
      this.content = "";
    },
  },
});
