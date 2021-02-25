<template>
    <div>
        <Form v-bind:judulVideo="judul" v-on:submitJawaban="submitJawaban($event)" />
    </div>
</template>

<script>
    import Form from "../components/VideoSendiri/Kelompok.vue";
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
                judul: "Video Kolaborasi",
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
                    axios.post('https://rajabrawijaya.ub.ac.id/api/penugasan/kolaborasi/pengumpulan/' + this.nim, {
                            jawaban: this.jawaban
                        }).then(res => {
                        if (res.data.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Jawaban berhasil dikumpulkan',
                            })
                            setTimeout(function (scope) {
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
            axios.get('https://rajabrawijaya.ub.ac.id/api/penugasan/status/detail/'+this.nim+'?type=kolaborasi').then((res) => {
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
    .first-container {
        background-image : url('../assets/bg.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        min-height: 100vh;
        padding: 2rem;
    }
</style>