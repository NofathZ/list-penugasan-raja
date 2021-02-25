<template>
  <div>
    <div class="background">
    <h1 style="text-align: center">Pilihan Ganda</h1>
    <div class="first-container">
      <div class="second-container">
        <div class="head">
          <p class="nomor-soal mt-1">Pertanyaan {{ Nomor }}/{{ AllPage }}</p>
          <div class="deskripsi-soal mt-3 mb-5">{{ Question.soal }}</div>
        </div>
        <div class="body">
          <div class="input">
            <div class="desktop">
              <div class="input-top">

                <input type="radio" id="A" :value="Question.pilihan[0]" v-model="Question.jawaban">
                <label for="A" class="pilihan">{{ Question.pilihan[0] }}</label>

                <input type="radio" id="C" :value="Question.pilihan[2]" v-model="Question.jawaban">
                <label for="C" class="pilihan">{{ Question.pilihan[2] }}</label>

                </div>
              <div class="input-bottom">
                
                <input type="radio" id="B" :value="Question.pilihan[1]" v-model="Question.jawaban">
                <label for="B" class="pilihan">{{ Question.pilihan[1] }}</label>
                
                <input type="radio" id="D" :value="Question.pilihan[3]" v-model="Question.jawaban">
                <label for="D" class="pilihan">{{ Question.pilihan[3] }}</label>

              </div>
            </div>
            <div class="smartphone">
              <div class="input-top">

                <input type="radio" id="A" :value="Question.pilihan[0]" v-model="Question.jawaban">
                <label for="A" class="pilihan">{{ Question.pilihan[0] }}</label>

                <input type="radio" id="B" :value="Question.pilihan[1]" v-model="Question.jawaban">
                <label for="B" class="pilihan">{{ Question.pilihan[1] }}</label>

                </div>
              <div class="input-bottom">
                
                <input type="radio" id="C" :value="Question.pilihan[2]" v-model="Question.jawaban">
                <label for="C" class="pilihan">{{ Question.pilihan[2] }}</label>

                <input type="radio" id="D" :value="Question.pilihan[3]" v-model="Question.jawaban">
                <label for="D" class="pilihan">{{ Question.pilihan[3] }}</label>

              </div>
            </div>
          </div>
          <div class="option">
            <button v-on:click="hapusJawaban">Hapus Jawaban</button>
            <div>
              <input type="checkbox" id="doubt" v-model="Question.ragu">
              <label for="doubt">Ragu-ragu</label>
            </div>
          </div>
        </div>
        <div class="foot">
          <div class="nextprev">
            <button v-on:click="changePageMinus">Sebelumnya</button>
            <button v-on:click="changePagePlus">Setelahnya</button>
          </div>
          <div class="submit-btn">
            <b-button id="show-btn" @click="$bvModal.show('KotakPilihanKumpulkan')">Pilihan Nomor / Kumpulkan</b-button>
          </div>
        </div>
      </div>
    </div>
    

    <!-- Modal Start -->

    <b-modal id="KotakPilihanKumpulkan" hide-footer>
        <template v-slot:modal-title>
          <h5 class="modal-title" id="staticBackdropLabel" style="font-size: 1rem">Nomor Soal</h5>
        </template>
        <div class="d-block text-center">
          <number-button
            v-bind:TheQuestions="Questions"
            v-bind:Nomor="Nomor"
            v-on:changeHalaman="gantiHalaman($event)"
          ></number-button>
        </div>
        <div>
            <b-button class="mt-3 btn" block variant="dark" @click="$bvModal.hide('KotakPilihanKumpulkan')">Keluar</b-button>
            <b-button class="mt-2 btn" block variant="primary" @click="$bvModal.hide('KotakPilihanKumpulkan')" v-on:click="showSubmit">Kumpulkan Jawaban</b-button>
            <!-- <b-button class="mt-2 btn" block variant="primary" @click="$bvModal.hide('KotakPilihanKumpulkan') || $bvModal.show('KumpulJawaban')">Kumpulkan Jawaban</b-button> -->
        </div>
    </b-modal>

    <!-- Modal End -->

    <!-- Modal Start -->

    <b-modal id="KumpulJawaban" hide-footer>
        <template v-slot:modal-title>
          <h5 class="modal-title" id="exampleModalLabel">Kumpulkan Jawaban</h5>
        </template>
        <div class="d-block text-center">
          <h6 class="modal-body">Anda yakin ingin mengumpulkan jawaban?</h6>
        </div>
        <div>
            <b-button class="mt-3 btn" variant="dark" block @click="$bvModal.hide('KumpulJawaban')">Keluar</b-button>
            <b-button class="mt-2 btn" variant="danger" block @click="$bvModal.hide('KumpulJawaban')" v-on:click="submitJawaban()">Kumpulkan Jawaban</b-button>
        </div>
    </b-modal>

    <!-- Modal End -->
</div>
  </div>
  <!-- <div>
    <p>{{ Question }}</p>
  </div> -->

</template>


<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Reem+Kufi&display=swap');

  * {
    font-family: 'Reem Kufi', sans-serif;
  }
  .background {
    padding: 0.5rem;
    padding: 2rem;
  }

  .first-container {
    background: none;
    height: 100vh;
    // padding: 2rem;

    .second-container {
      width: 100%;
      // height: 100%;
      background-color: white;
      border-radius: 10px;
      padding: 1rem 0 2rem 0;

      .head {
        // height: 25%;

        .nomor-soal {
          text-align: center;
          margin: 0;
          height: 25%;
          color: #0242A1;
        }

        .deskripsi-soal {
          // margin: 2rem 0;
          text-align: center;
          height: 75%;
          font-size: 1.15rem;
          padding: 0 2rem;
          cursor: text;
        }
      }

      .body {
        // height: 55%;

        .input {
          width: 80%;
          margin: 0 auto;

          .smartphone {
            display: none;
          }
        }


        .input-top, .input-bottom {
          display: flex;
          justify-content: space-between;
          // display: block;

          //cara agar turun kebawah, pas @media hp display kasih block
          input {
            display: none;
          }

          .pilihan {
            font-size: 0.9rem;
            padding: 0 2rem;
            border: 2px solid black;
            width: 30rem;
            height: 8rem;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            cursor: pointer;
          }

          input:checked + label {
            background: #91E5F4;
          }
        }

        .option {
          width: 80%;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          margin-top: .4rem;
          font-size: 1rem;

          button {
            background: none;
            border: none;
            padding: 0;
          }

          button:first-child {
            border-bottom: 2px solid #1F78FF;
            color: #1F78FF;
          }

          div {

            input {
              width: 10px;
              height: 10px;
            }
            
            label {
              display: inline;
              color: #FFB31F;
              border-bottom: 2px solid #FFB31F;
              margin-left: .5rem;
              cursor: pointer;
            }
          }
        }

        .input-top {
          margin: 1rem 0;
        }
      }

      .foot {
        // height: 20%;
        margin-top: 2rem;

        .nextprev {
          width: 45%;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;

          button {
            width: 12rem;
            height: 2.5rem;
            border: 1px solid black;
            border-radius: 2px;
            background-color: #3282B8;
            color: white;

          }
        }

        .submit-btn {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
          
          button {
            width: 15rem;
            height: 2.5rem;
            border: 1px solid black;
            border-radius: 2px;
            background-color: #31AC3D;
            color: white;
          }
        }
      }
    }
  }

  @media screen and (max-width: 800px) and (orientation: portrait){
     .first-container {
       padding: 0;

       .second-container {
         background-color: rgba($color: #ffffff, $alpha: 0.5);
         
         .head {

           .nomor-soal {
             font-size: 0.5rem;
           }
           
           .deskripsi-soal {
             font-size: 0.7rem;
           }
         }

         .body {

            .input {

             .desktop {
               display: none;
             }
             
             .smartphone {
               display: block;
             }

             .input-top, .input-bottom {
               display: block;

               .pilihan {
                 width: 100%;
                 height: 11vh;
                 font-size: 0.5rem;
               }

               :first-child {
                 margin-bottom: .50rem;
               }
             }

             .input-top {
               margin-bottom: 0.5rem;
             }
           }

           .option {
             font-size: 0.6rem;
           }
         }

         .foot {

           .nextprev {
             width: 90%;

             button {
               width: 7rem;
               height: 2rem;
               font-size: 0.7rem;
             }
           }

           .submit-btn {
             
             button {
               width: 10rem;
               height: 3rem;
               font-size: 0.7rem;
             }
           }
         }
       }
     }
  }

  @media screen and (max-width: 800px) and (orientation: landscape) {
    .first-container {
      padding: 1rem;

      .second-container {
        
        .head {

          .nomor-soal {
            font-size: 0.5rem;
          }

          .deskripsi-soal {
            font-size: 1rem;
          }
        }
        
        .body {

          .input {

            .input-top, .input-bottom {

              .pilihan {
                font-size: 0.7rem;
                width: 13rem;
                height: 2rem;
              }

            }
          }

          .option {
            font-size: 0.7rem;
          }
        }

        .foot {

          .nextprev {
            width: 80%;

            button {
              width: 7rem;
              height: 1.5rem;
              font-size: 0.7rem;
            }
          }

          .submit-btn {
            margin-top: 0.2rem;

            button {
              width: 12rem;
              height: 1.5rem;
              font-size: 0.7rem;
            }
          }
        }
      }
    }
  }


</style>

<script>
import NumberButton from "./NumberButton";

import Swal from 'sweetalert2'

const Swalt = require('sweetalert2')

export default {
  props: ["Question", "PageNow", "AllPage", "Questions", "Nomor"],
  components: {
    "number-button": NumberButton,
  },
  data() {
    return {};
  },
  methods: {
    changePagePlus: function () {
      if (this.PageNow < this.AllPage) {
        this.$emit("changePagePlus", this.PageNow + 1);
      }
    },
    changePageMinus: function () {
      if (this.PageNow > 1) {
        this.$emit("changePageMinus", this.PageNow - 1);
      }
    },
    hapusJawaban: function () {
      return (this.Question.jawaban = "");
    },
    gantiHalaman: function (event) {
      this.$emit("changeHalaman", event);
    },
    submitJawaban: function () {
      this.$emit("submitJawaban");
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
};
</script>