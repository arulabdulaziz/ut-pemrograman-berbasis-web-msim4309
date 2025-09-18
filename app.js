new Vue({
  el: '#app',
  data: {
      mahasiswa: []
  },
  created() {
      fetch('getData.php')
          .then(response => response.json())
          .then(data => {
              this.mahasiswa = data;
          })
          .catch(error => console.error('Error:', error));
  }
});
