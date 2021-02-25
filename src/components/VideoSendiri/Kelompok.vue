<template>
    <div class="first-container">
        <center>
            <h1 class="mb-3" style="font-family: 'Reem Kufi', sans-serif;">{{ judulVideo }}</h1>
        </center>
        <div class="second-container container">
            <div class="row description">
                <div class="col-md-12">
                    <div class="alert alert-warning" role="alert">
                        <h4><i class="fa fa-info"></i> Informasi</h4>
                        <ol style="padding:15px">
                            Silahkan diskusikan dengan teman kelompokmu terkait Tugas Video Ini, Selalu Pantau Halaman Ini Juga Jika Anggota Kelompokmu belum lengkap 6 Orang
                            <br>
                            <br>Berikut ini adalah teman sekelompokmu : 
                            <br>
                            <li v-for="t in teman" :key="t.index">
                                Nama : {{ t.nama }} <br>
                                Fakultas : {{ t.fakultas }} <br>
                                Prodi : {{ t.prodi }} <br>
                                Kontak : {{ t.kontak }} <br><br>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
            <div class="form-input">
                <h3><strong>Link Post Instagram</strong></h3>
                <input type="text" placeholder="https://www.instagram.com/....." v-model="jawabanPeserta">
                <b-button id="show-btn" v-on:click="showSubmit()">Kumpulkan</b-button>
            </div>
        </div>
    </div>
</template>

<script>
    import Swal from 'sweetalert2'

    const Swalt = require('sweetalert2')
    import axios from 'axios'

    export default {
        props: ["deskripsi", "judulVideo"],
        
        data() {
            return {
                jawabanPeserta : "",
                teman: "",
                nim: localStorage.getItem('nim') ?? 183140914111001,
            }
        },
        methods: {
            submitJawaban: function () {
                this.$emit("submitJawaban", this.jawabanPeserta);
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
            axios.get('https://rajabrawijaya.ub.ac.id/api/penugasan/kolaborasi/kelompok/data/'+this.nim+'?type=kolaborasi').then((res) => {
                if(res.data.data){
                    this.teman = res.data.data
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    
    .first-container {
        min-height: 100vh;
        box-sizing: border-box;
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
            box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.16),
                        -2px -4px 8px rgba(255, 255, 255, 0.16),
                        inset 2px 4px 8px rgba(0, 0, 0, 0.08),
                        inset -2px -4px 8px rgba(0, 0, 0, 0.08);
            margin: 1rem auto 0 auto;
            border-radius: 0.5rem;
            padding: 2rem;

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