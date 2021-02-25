<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import axios from 'axios'
  import Swal from 'sweetalert2'

  export default {
    data() {
      return {
        nim: localStorage.getItem('nim') ?? 183140914111001,
      }
    },
    beforeMount(){
      axios.get('https://rajabrawijaya.ub.ac.id/api/penugasan/kolaborasi/kelompok/status/'+this.nim).then(res => {
        if(res.data.status == false) {
          Swal.fire({
            icon: 'info',
            title: 'Pemberitahuan',
            text: 'Sebelum mulai mengerjakan tugas, silahkan mengisi data kontak kamu terlebih dahulu untuk saling terhubung dengan teman sekelompokmu.'
          })
          setTimeout(function () {
            this.$router.push('/kelompok').catch(()=>{});
          }.bind(this), 3000);
        }
      }).catch ((err) => {
        console.log(err);
      })
    }
  }
</script>

<style lang="scss">
  @import "~bootstrap/scss/bootstrap";

  @import url('https://fonts.googleapis.com/css2?family=Reem+Kufi&display=swap');

  * {
    font-family: 'Reem Kufi', sans-serif;
  }
</style>