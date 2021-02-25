<template>
    <div class="wrapper">
        <div class="container py-4">
            <div class="row d-flex justify-content-center">
                <h1 class="heading-1">Penugasan RAJA Brawijaya</h1>
            </div>
            
            <div class="row py-4">
                <div class="col-md-12">
                    <div class="alert alert-warning mb-0" role="alert">
                        <div class="heading-2">
                            <i class="fa fa-info mr-1" style="width: 30px; height: 30px; display: inline-block; padding: 0.25rem;"></i>
                            <span>Informasi</span>
                        </div>
                        <ol class="p-0 pl-4">
                            <li>
                                <strong>Sebelum mengerjakan penugasan diwajibkan untuk membaca buku materi RAJA Brawijaya 2020 terlebih dahulu. <a href="https://rajabrawijaya.ub.ac.id/assets/panduan-penugasan.pdf">Unduh Buku Panduan</a></strong> 
                            </li>
                            <li>
                                <strong>Sebelum mengerjakan penugasan, diwajibkan bagi mahasiswa baru untuk memfollow seluruh akun sosial media RAJA Brawijaya.</strong>
                            </li>
                            <li>
                                Penugasan <strong>hanya bisa dilakukan 1 kali dan tidak bisa diulang kembali.</strong>
                            </li>
                            <li>
                                Penugasan <strong>hanya bisa dilakukan pada waktu yang telah ditentukan.</strong>
                            </li>
                            <li>Jika ada pemberitahuan tambahan akan diumumkan di halaman Adhikara Info.</li>
                            <li>Jika terjadi kesalahan atau kamu kebingungan silahkan tanyakan melalui Sosial Media Resmi RAJA Brawijaya 2020.</li>
                        </ol>
                    </div>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col-md-6">
                    <h3 class="text text-blue">Progress kamu sudah {{ besarProgres + '%' }}</h3>
                </div>
                <div class="col-md-6">
                    <div class="kotakProgres">
                        <div class="besarProgres"></div>
                    </div>
                </div>
            </div>
                
            <div class="row">
                <div class="col-md-6 col-lg-4 mb-5" v-for="tugas in dataTugas" :key="tugas.linkTask">
                    <div class="custom-card">
                        <div class="card-body d-flex">
                            <div class="col-md-9 p-0">
                                <h4 class="text-white">{{ tugas.judul }}</h4>
                                <p class="text-white-50">{{ tugas.deskripsi }}</p>
                            </div>

                            <div class="col-md-3 p-0 d-flex justify-content-end">
                                <div v-if="tugas.status">
                                    <i class="fas fa-check-circle icon tandaStatus" style="color: #0f8a2c"></i>
                                </div>
                                <div v-else>
                                    <i class="fas fa-exclamation-circle icon text-danger tandaStatus"></i>
                                </div>
                            </div>
                        </div>

                        <div class="card-footer p-0">
                            <router-link v-if="!tugas.status" v-bind:to="tugas.url">Kerjakan</router-link>
                            <span class="disabled" v-else>Selesai</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .tandaStatus {
        font-size: 2.5rem !important;
    }

    @media screen and (max-width: 1000px) {
        .tandaStatus {
            font-size: 3rem !important;
        }
    }
</style>

<script>
    import Vue from 'vue'
    import axios from 'axios'

    export default {
        data() {
            return {
                besarProgres: 0,
                // dataTugas: undefined,
                dataTugas: [
                    {
                        judul: "Pilihan Ganda",
                        deskripsi: "Memilih jawaban yang paling tepat",
                        status: false,
                        url: "/pilgan"
                    },
                    {
                        judul: "Tebak Lirik",
                        deskripsi: "Tebak liriknya",
                        status: false,
                        url: "/lyrics"
                    },
                    {
                        judul: "Kelompok",
                        deskripsi: "Mengerjakan A",
                        status: false,
                        url: "/kelompok"
                    },
                    {
                        judul: "Superheroes",
                        deskripsi: "Mengerjakan A",
                        status: false,
                        url: "/superheroes"
                    },
                    {
                        judul: "BMC",
                        deskripsi: "Mengerjakan A",
                        status: false,
                        url: "/bmc"
                    },
                    {
                        judul: "Bercerita",
                        deskripsi: "Mengerjakan A",
                        status: false,
                        url: "/bercerita"
                    },
                    {
                        judul: "Motivasi",
                        deskripsi: "Mengerjakan A",
                        status: false,
                        url: "/motivation"
                    },
                    {
                        judul: "Mental Health",
                        deskripsi: "Mengerjakan A",
                        status: false,
                        url: "/mental-health"
                    },
                    {
                        judul: "Kolaborasi",
                        deskripsi: "Mengerjakan A",
                        status: false,
                        url: "/kolaborasi"
                    }
                ],
                nim: localStorage.getItem('nim') ?? 183140914111001,
            }
        },
        mounted() {
            /**
             * ======================================================
             * Mengambil Data Penugasan
             * ======================================================
             * 
             * Kode ini mengambil data penugasan melalui api raja
             * dengan parameter nim yang diterima dari local storage.
             * Berikutnya, kita berikan hasil fetch tadi ke data
             * "dataTugas" yang nantinya dataTugas akan di loop.
             * Data yang diterima berupa: Judul, Deskripsi, Status,
             * dan Url. Terakhir, kita akan tentukan nilai untuk
             * besar progres
             */
            // axios.get('https://rajabrawijaya.ub.ac.id/api/penugasan/status/'+this.nim)
            //     .then(response => {
            //         this.dataTugas = [...response.data.data]

            //         let banyakSelesai = 0
            //         this.dataTugas.forEach(data => {
            //             if (data.status == true) {
            //                 banyakSelesai++;
            //             }
            //         })

            //         this.besarProgres = ( banyakSelesai / this.dataTugas.length ) * 100
            //         document.querySelector('.besarProgres').setAttribute('style', `width: ${this.besarProgres}%`)
            //     })
        }
    }
</script>