<template>
  <div class="wrapper">
    <div v-for="(TheQuestion, index) in TheQuestions" :key="index">
      <div v-if="index+1 == halamanSekarang">
        <question
          v-bind:Nomor="index+1"
          v-bind:Questions="TheQuestions"
          v-bind:Question="TheQuestion"
          v-bind:AllPage="TheQuestions.length"
          v-bind:PageNow="halamanSekarang"
          v-on:changePagePlus="nextQ($event)"
          v-on:changePageMinus="prevQ($event)"
          v-on:changeHalaman="pageQ"
          v-on:submitJawaban="submitJawaban($event)"
        ></question>
      </div>
    </div>
  </div>
</template>

<script>
import Question from "../components/ExamPage/Question.vue";
import Vue from 'vue'
import axios from 'axios'

import Swal from 'sweetalert2'
const Swalt = require('sweetalert2')


export default {
  components: {
    question: Question,
  },
  data() {
    return {
      halamanSekarang: 1,
      submit: false,
      jawabanAkhir: [],
      // TheQuestions: undefined,
      TheQuestions: [
        {
          index: 0,
          soal: "Soal 1",
          pilihan: [
            "A",
            "B",
            "C",
            "D",
          ],
          ragu: false,
          jawaban: ''
        },
        {
          index: 1,
          soal: "Soal 2",
          pilihan: [
            "A",
            "B",
            "C",
            "D",
          ],
          ragu: false,
          jawaban: ''
        },
        {
          index: 2,
          soal: "Soal 3",
          pilihan: [
            "A",
            "B",
            "C",
            "D",
          ],
          ragu: false,
          jawaban: ''
        },
      ],
      nim: localStorage.getItem('nim') ?? 183140914111001,
    };
  },
  methods: {
    nextQ: function (event) {
      this.halamanSekarang = event;
    },
    prevQ: function (event) {
      this.halamanSekarang = event;
    },
    pageQ: function (event) {
      this.halamanSekarang = event;
    },
    submitJawaban: function () {
      this.submit = true;
      this.TheQuestions.forEach(Question => {
        if (Question.jawaban == '') {
          this.submit = false;
        }
      })
      if (this.submit == true) {
        this.TheQuestions.forEach((Question) => {
          this.jawabanAkhir.push(Question.jawaban);
        });
        axios.post('https://rajabrawijaya.ub.ac.id/api/penugasan/pilgan/pengumpulan/' + this.nim, {
            jawaban: this.jawabanAkhir
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
    axios.get('https://rajabrawijaya.ub.ac.id/api/penugasan/status/detail/'+this.nim+'?type=pilgan').then((res) => {
      if (res.data.status) {
        this.$router.push('/').catch(() => {});
      }
    })
    axios.get('https://rajabrawijaya.ub.ac.id/api/penugasan/pilgan/soal/'+this.nim).then((respon) => {
        this.TheQuestions = [...respon.data.data]
    })
  }
};
</script>