<template>
    <div class="wrapper">
        <Form v-bind:judulVideo="judul" v-on:submitJawaban="submitJawaban($event)" />
    </div>
</template>

<script>
    import Form from "../components/VideoSendiri/Form.vue";
    import Swal from 'sweetalert2'

    const Swalt = require('sweetalert2')
    import axios from 'axios'

    export default {
        components: {
            Form
        },
        data() {
            return {
                submit: false,
                judul: "Video Adhikara Bercerita",
                jawaban: "",
                nim: localStorage.getItem('nim') ?? 183140914111001,
            }
        },
        methods: {
            submitJawaban: function (jawaban) {
                this.jawaban = jawaban;
                this.submit = true;

                if (this.jawaban == "") {
                    this.submit = false
                }

                if (this.submit == true) {
                    axios.post('https://rajabrawijaya.ub.ac.id/api/penugasan/video/pengumpulan/' + this.nim + '?type=adhikara_bercerita', {
                            jawaban: this.jawaban
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
                        Swal.fire({
                                icon: 'error',
                                title: 'Gagal mengumpulkan Jawaban',
                            })
                        console.log(err);
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
        mounted(){
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
            axios.get('https://rajabrawijaya.ub.ac.id/api/penugasan/status/detail/'+this.nim+'?type=adhikara_bercerita').then((res) => {
                if(res.data.status){
                    this.$router.push('/').catch(() => {});
                }
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