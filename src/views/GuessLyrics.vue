<template>
    <div class="wrapper">
        <LyricsQuestion v-bind:DataLagu="dataLagu" v-on:submitJawaban="submitJawaban($event)" />
    </div>
</template>

<script>
    import LyricsQuestion from '../components/GuessLyrics/LyricsQuestion.vue'
    import Swal from 'sweetalert2'
    import Vue from 'vue'
    import axios from 'axios'
    const Swalt = require('sweetalert2')

    export default {
        components: {
            LyricsQuestion
        },
        data() {
            return {
                submit: true,
                jawabanPeserta: [],
                dataLagu: {
                    hymne: ["Pada zaman {...1} budaya Indonesia", "Jaya bertahta permata pujaan negara", "Penyuluh jiwa budi satria nan perwira",
                            "Itulah {...2} Maharaja Brawijaya mulia",
                            "Ooh, {...3} luhur citanya,",
                            "luhur tujuannya",
                            "Ooh, Brawijaya lambang abadi,",
                            "kebangunan/keagungan Indonesia"],
                    mars: ["Berpadu di {...1} langkah menyambut terangnya sang surya",
                            "Universitas Brawijaya sumber Ilmu dan budaya",
                            "Kibarkan {...2} patria serempak dalam satu cita",
                            "Ayo bangkit semangat baja bahagia menanti kita",
                            "Maju terus {...3} Almamater tercinta Universitas Brawijaya",
                            "Dengan rahmat Tuhan dan dasar pancasila abadilah namamu",
                            "Dengan jiwa Tri Dharmamu kami setia mengawalmu",
                            "Universitas Brawijaya jayalah sepanjang masa"
                    ],
                    jawaban_hymne: [
                        "",
                        "",
                        ""
                    ],
                    jawaban_mars: [
                        "",
                        "",
                        ""
                    ]
                    
                },
                nim: localStorage.getItem('nim') ?? 183140914111001,
            }
        },
        methods: {
            submitJawaban: function () {
                this.submit = true;
                this.dataLagu.jawaban_hymne.forEach(data => {
                    if (data == null) {
                        this.submit = false
                    }
                })
                this.dataLagu.jawaban_mars.forEach(data => {
                    if (data == null) {
                        this.submit = false
                    }
                })
                if (this.submit == true) {
                    let jawabanPeserta = this.dataLagu.jawaban_hymne.concat(this.dataLagu.jawaban_mars)
                    axios.post('https://rajabrawijaya.ub.ac.id/api/penugasan/lirik/pengumpulan/' + this.nim, {
                            jawaban: jawabanPeserta
                        }).then(res => {
                        if (res.data.status) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Jawaban berhasil dikumpulkan',
                            })
                            setTimeout(function(scope) {
                                this.$router.push('/').catch(() => {});
                            }.bind(this), 1000);
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Gagal mengumpulkan Jawaban',
                            })
                        }
                    }).catch((err) => {
                        console.log(err);
                        Swal.fire({
                                icon: 'error',
                                title: 'Gagal mengumpulkan Jawaban',
                            })
                    })
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Jawaban anda belum lengkap',
                    })
                }
            }
        },
        mounted() {
            axios.get('https://rajabrawijaya.ub.ac.id/api/penugasan/kolaborasi/kelompok/status/' + this.nim).then(res => {
                if (res.data.status == false) {
                    Swal.fire({
                        icon: 'info',
                        title: 'Pemberitahuan',
                        text: 'Sebelum mulai mengerjakan tugas, silahkan mengisi data kontak kamu terlebih dahulu untuk saling terhubung dengan teman sekelompokmu.'
                    })
                    setTimeout(function () {
                        this.$router.push('/kelompok').catch(() => {});
                    }.bind(this), 3000);
                }
            }).catch((err) => {
                console.log(err);
            })
            axios.get('https://rajabrawijaya.ub.ac.id/api/penugasan/status/detail/'+this.nim+'?type=lagu').then((res) => {
                if(res.data.status){
                    this.$router.push('/').catch(() => {});
                }
            })
            axios.get('https://rajabrawijaya.ub.ac.id/api/penugasan/lirik/soal/'+this.nim).then((respon) => {
                this.dataLagu = respon.data.data
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