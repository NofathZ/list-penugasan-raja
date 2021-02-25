<template>
    <div class="first-container">
        <div class="second-container container">
            <div class="row description">
                <div class="col-md-12">
                    <div class="alert alert-warning" role="alert">
                        <h4><i class="fa fa-info"></i> Informasi</h4>
                        <ol style="padding:15px">
                            <li><strong>Silahkan isi Kontak kamu.</strong> </li>
                            <li><strong>Pastikan Kontak yang kamu masukkan Aktif.</strong> </li>
                            <li><strong>Tidak ada kewajiban untuk mengisi semua sosial media.</strong> </li>
                            <li><strong>Jika ada kontak yang tidak ingin dibagikan silahan isi dengan huruf - Saja.</strong> </li>
                            <li><strong>Hubungi teman sekelompokmu di halaman tugas kelompok untuk berkomunikasi.</strong> </li>
                        </ol>
                    </div>
                </div>
            </div>
            <div class="form-input">
                <label for="instagram">Username Instagram</label>
                <input type="text" placeholder="@raja_brawijaya" v-model="instagram">
                
                <label for="line">Line ID</label>
                <input type="text" placeholder="raja_brawijaya" v-model="line">

                <label for="wa">No Whatsapp</label>
                <input type="text" placeholder="+628..." v-model="wa">
            </div>

            <div class="text-center">
                <b-button variant="primary" class="mt-3" v-on:click="kirim">Simpan Kontak</b-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Swal from 'sweetalert2'

    export default {
        data() {
            return {
                instagram : '-',
                line : '-',
                wa : '-',
                nim: localStorage.getItem('nim') ?? 183140914111001,
            }
        },
        methods: {
            kirim(){
                if(this.instagram == '' || this.line == '' || this.wa == ''){
                    Swal.fire({
                        icon: 'error',
                        title: 'Terjadi Kesalahan.',
                        text: 'Pastikan telah mengisi semua data (Jika ada yang kosong cukup isi - saja)',
                    })
                }
                axios.post('https://rajabrawijaya.ub.ac.id/api/penugasan/kolaborasi/kelompok/acak/' + this.nim, {
                        line: this.line,
                        wa: this.wa,
                        instagram: this.instagram
                    }).then(res => {
                            if (res.data.status) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Berhasil menyimpan data.',
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
        },
        beforeMount(){
            axios.get('https://rajabrawijaya.ub.ac.id/api/penugasan/kolaborasi/kelompok/status/' + this.nim).then(res => {
                if (res.data.status == true) {
                    this.$router.push('/').catch(() => {});
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
</script>

<style lang="scss" scoped>
    
    .first-container {
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
            margin: 1rem auto 0 auto;
            border: 1px solid #B4B4B4;
            border-radius: 5px;
            padding: 2rem;

            p {
                margin: 0;
                margin-bottom: 1rem;
            }

            input {
                width: 100%;
                padding: 0.3rem 0.2rem;
                margin-bottom: 1rem;
            }
        }
    }

    @media screen and (max-width: 800px) {
        .first-container {

            .form-input {

                .submit-btn {

                    button {
                        font-size: 0.7rem;
                    }
                }
            }
        }
    }

</style>