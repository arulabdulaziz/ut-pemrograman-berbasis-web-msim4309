new Vue({
  el: '#app',
  data: {
      mahasiswa: []
  },
  created() {
      fetch('getData.php')
          .then(response => {
            console.log(response, '<<<<,')
            return response.json()
          })
          .then(data => {
            console.log(data, 'data')
              this.mahasiswa = data;
          })
          .catch(error => console.error('Error:', error));
  }
});
