<template>
    <div class="lyrics-box">
        <div v-if="songNumber == 1">
            <h2 class="title-song" style="font-family: 'Reem Kufi', sans-serif;">Hymne UB</h2>
        </div>
        <div v-else>
            <h2 class="title-song" style="font-family: 'Reem Kufi', sans-serif;">Mars UB</h2>
        </div>
        <div class="song-container mb-3">
            <div class="song">
                <div v-if="songNumber == 1">
                    <audio controls loop style="box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.16); border-radius: 50px">
                        <source src="https://rajabrawijaya.ub.ac.id/assets/penugasan/hymne-ub.mp3" type="audio/ogg">
                        Your browser dose not Support the audio Tag
                    </audio>
                </div>
                <div v-else>
                    <audio controls loop>
                        <source src="https://rajabrawijaya.ub.ac.id/assets/penugasan/mars-ub.mp3" type="audio/ogg">
                        Your browser dose not Support the audio Tag
                    </audio>
                </div>
            </div>
        </div>
        <div class="lyrics card container mb-3" style="font-family: 'Reem Kufi', sans-serif; box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.16);">
            <button v-html="soal"></button>
        </div>
        <div class="input card container" style="box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.16);">
            <div class="input-group mb-3" v-for="(inputan, index) in inputJawaban" :key="index">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">{{ index+1 }}</span>
                </div>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="inputJawaban[index]">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["Lirik", "songNumber", "inputJawaban"],
        data() {
            return {
                soal: ''
            }
        },
        mounted() {
            let lirik = ""

            this.Lirik.forEach(lir => {
                lirik += lir + " " + "<br>"
            })
            this.soal = lirik;

        }
    }
</script>

<style lang="scss" scoped>
    .lyrics-box {

        .title-song {
            text-align: center;
        }
    }

    .song-container {
        display: flex;
        justify-content: center;
    }

    .song {
        width: 100%;
        height: auto;
        padding: 20px;
        border-radius: 5px;
        // background-color: #67aed2;
        
        
        overflow: hidden;
    }
    audio {
        width:100%;
    }
    .song {
        margin: 0;
    }

    .input {
        padding: 1rem;
    }

    .lyrics {
        padding:1.5rem;

        button {
            height: 75%;
            font-size: 1.15rem;
            overflow-y: auto;
            display: block;
            background: none;
            cursor: text;
            outline: none;
            border: none;
            user-select: text;
            height: 20rem;
            letter-spacing: 0px;
            word-spacing: 2px;
            line-height: 28px;
        }
    }
    @media screen and (max-width: 800px) and (orientation: portrait) {
        .video {
            
            iframe#myIframe {
                width: 75.5vw;
                height: 43.5vw;
            }
        }
        .lyrics-box {
            margin-bottom: 2rem;
        }
    }
    @media screen and (max-width: 800px) and (orientation: landscape) {
        .video {
            
            iframe#myIframe {
                width: 82.5vw;
                height: 47.5vw;
            }
        }
        .lyrics-box {
            margin-bottom: 2rem;
        }
    }
</style>