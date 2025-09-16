var app = new Vue({
    el: '#app',
    data: {
        hasil: 0
    },
    methods: {
        reset() {
            this.hasil = 0;
        },
        count() {
            this.hasil++;
        }
    }
});
