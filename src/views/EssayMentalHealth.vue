<template>
    <div class="first-container">
        <center>
            <h1 class="mb-3" style="font-family: 'Reem Kufi', sans-serif;">{{ judul }}</h1>
        </center>
        <div class="second-container container">
            <div class="row description">
                <div class="col-md-12">
                    <div class="alert alert-warning" role="alert">
                        <h4><i class="fa fa-info"></i> Informasi</h4>
                        <ol style="padding:15px">
                            <li>Semua detail ketentuan tiap tugas bisa dibaca melalui Buku Panduan yang telah disediakan.</li>
                            <li>Jika terjadi kesalahan atau kamu kebingungan silahkan tanyakan melalui Sosial Media Resmi RAJA Brawijaya 2020.</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div class="form-input">
                <h4><strong>Blogspot</strong></h4>
                <input type="text" class="mb-3" placeholder="https://www.blogspot.com/....." v-model="jawaban[0]">
                <h4><strong>Twitter</strong></h4>
                <input type="text" placeholder="https://twitter.com/....." v-model="jawaban[1]">
                <h4><strong>TextArea</strong></h4>
                <textarea v-model="jawaban[2]"></textarea>
                <div class="submit-btn mt-3">
                    <b-button id="show-btn" v-on:click="showSubmit()">Kumpulkan</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Form from "../components/VideoSendiri/Form.vue";
    import Swal from 'sweetalert2'
    import axios from 'axios'

    const Swalt = require('sweetalert2')

    export default {
        components: {
            Form
        },
        data() {
            return {
                submit: false,
                judul: "Essay Mental Health",
                jawaban: [null, null, null],
                nim: localStorage.getItem('nim') ?? 183140914111001,
            }
        },
        methods: {
            submitJawaban: function () {
                this.submit = true;

                this.jawaban.forEach(jawaban => {
                    if (jawaban == "" || null) {
                        this.submit = false
                    }
                })

                if (this.jawaban[2] != null || "") {
                    if (this.jawaban[2].split(" ").length < 500) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Gagal mengumpulkan Jawaban',
                            desc: "Jawaban anda tidak mencapai 500 kata"
                        })
                    }
                }
                if (this.submit == true) {
                     axios.post('https://rajabrawijaya.ub.ac.id/api/penugasan/mental_health/pengumpulan/' + this.nim, {
                             jawaban: this.jawaban
                         }).then(res => {
                        if (res.data.status) {
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
            },
            showSubmit: function() {
                Swal.fire({
                    title: 'Kumpulkan Jawaban?',
                    text: "Jawaban anda tidak dapat dirubah lagi setelah mengumpulkan jawaban",
                    icon: 'question',
                    showCancelButton: true,
                    cancelButtonText: "Batalkan",
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Kumpulkan Jawaban'
                }).then((result) => {
                    if (result.isConfirmed) {
                    this.submitJawaban()
                    }
                })
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
            axios.get('https://rajabrawijaya.ub.ac.id/api/penugasan/status/detail/'+this.nim+'?type=mental_health').then((res) => {
                if (res.data.status) {
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
        width: 100vw;
        box-sizing: border-box;
        background-image : url('../assets/bg.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        min-height: 100vh;
        padding: 2rem;

        .second-container {
            border: none;
            box-sizing: border-box;
            border-radius: 10px;
            padding: 1rem;
            background-color: white;
        }

        .description {
            line-height: 2rem;
            word-spacing: 0.2rem;
            font-size: 18px;
        }

        .form-input {
            // box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.16),
            //             -2px -4px 8px rgba(255, 255, 255, 0.16),
            //             inset 2px 4px 8px rgba(0, 0, 0, 0.08),
            //             inset -2px -4px 8px rgba(0, 0, 0, 0.08);
            box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.16);
            margin: 1rem auto 0 auto;
            border-radius: 0.5rem;
            padding: 2rem;

            textarea {
                width: 100%;
                min-height: 100px;
                border: 1px solid rgba(0, 0, 0, 0.16);
                &:focus {
                    border-bottom: 1px solid rgba(0, 0, 0, 0.48);
                }
            }

            p {
                margin: 0;
            }

            input {
                width: 100%;
                padding: 0.25rem 0.5rem;
                margin: 1rem 0;
                border: none;
                outline: none;
                background: none;
                border-bottom: 1px solid rgba(0, 0, 0, 0.16);
                transition: .4s ease-out;
                &:focus {
                    border-bottom: 1px solid rgba(0, 0, 0, 0.48);
                }
            }
            button {
                width: 100%;
                border-radius: 0.25rem;
                // width: 15rem;
                // height: 2.5rem;
                // border: 1px solid black;
                // border-radius: 2px;
                // background-color: #31AC3D;
                // color: white;
            }
        }
    }
</style>