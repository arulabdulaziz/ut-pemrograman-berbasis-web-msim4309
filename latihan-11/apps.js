var app = new Vue({
    el: "#app",
    data: {
        celcius: 0,
        hasil: ''
    },
    methods: {
        fahrenheit() {
            let c = parseFloat(this.celcius);
            this.hasil = ((c * 9) / 5 + 32).toFixed(2) + " <sup>o</sup>F";
        },
        kelvin() {
            let c = parseFloat(this.celcius);
            this.hasil = (c + 273.15).toFixed(2) + " R";
        }
    }
});
