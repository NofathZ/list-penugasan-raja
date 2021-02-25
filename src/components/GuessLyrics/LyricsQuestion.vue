<template>
    <div>
        <div class="first-container">
            <h1 style="text-align: center; font-family: 'Reem Kufi', sans-serif;">Tebak Lirik</h1>
            <div class="second-container">
                <div class="content-container">
                    <div class="left-song">
                        <LyricsBox v-bind:Lirik="DataLagu.hymne" v-bind:inputJawaban="DataLagu.jawaban_hymne" songNumber=1 />
                    </div>
                    <div class="right-song">
                        <LyricsBox v-bind:Lirik="DataLagu.mars" v-bind:inputJawaban="DataLagu.jawaban_mars" songNumber=2 />
                    </div>
                </div>
                <div class="submit-btn">
                    <b-button id="show-btn" v-on:click="showSubmit()">Kumpulkan</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LyricsBox from './LyricsBox.vue';
    import Swal from 'sweetalert2'

    const Swalt = require('sweetalert2')

    export default {
        props: ["DataLagu"],
        components: {
            LyricsBox
        },
        methods: {
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
    }
</script>

<style lang="scss" scoped>

    .first-container {
        width: 100vw;
        box-sizing: border-box;
        padding: 2rem;

        .second-container {
            border: none;
            box-sizing: border-box;
            border-radius: 10px;
            padding: 1rem;
            background-color: white;
        
            .content-container {
                display: flex;

                .left-song, .right-song {
                    width: 100%;
                    height: 100%;
                    margin: 1rem;
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

    @media screen and (max-width: 800px){
        .first-container {
            padding: 1rem;

            .second-container {

                .content-container {
                    display: block;

                    .left-song, .right-song {
                        margin: 0;
                    }
                }
            }

        }
    }
</style>