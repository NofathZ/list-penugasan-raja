<template>
  <!-- <div id="row my-row">
    <div v-for="(TheQuestion, index) in TheQuestions" :key="index" @click="$bvModal.hide('KotakPilihanKumpulkan') || $bvModal.hide('KumpulJawaban')" >
      <div v-if="TheQuestion.ragu == true">
        <div
          class="btn-container btn btn-warning col-2"
          v-on:click="halamanSekarang(index+1)"
        >{{ index+1 }}</div>
      </div>
      <div v-else-if="TheQuestion.jawaban == ''">
        <div
          class="btn-container btn btn-outline-secondary col-2"
          v-on:click="halamanSekarang(index+1)"
        >{{ index+1 }}</div>
      </div>
      <div v-else>
        <div
          class="btn-container btn btn-success col-2"
          v-on:click="halamanSekarang(index+1)"
        >{{ index+1 }}</div>
      </div>
    </div>
  </div> -->
  <div class="container">
    <div class="row" style="display: flex; justify-content: center">
      <div class="col-md-6 col-lg-4 mt-3" v-for="(TheQuestion, index) in TheQuestions" :key="index" @click="$bvModal.hide('KotakPilihanKumpulkan') || $bvModal.hide('KumpulJawaban')">
        <div v-if="TheQuestion.ragu == true">
        <div
          class="btn-container btn btn-warning col-md-8"
          v-on:click="halamanSekarang(index+1)"
        >{{ index+1 }}</div>
      </div>
      <div v-else-if="TheQuestion.jawaban == ''">
        <div
          class="btn-container btn btn-outline-secondary col-md-8"
          v-on:click="halamanSekarang(index+1)"
        >{{ index+1 }}</div>
      </div>
      <div v-else>
        <div
          class="btn-container btn btn-success col-md-8"
          v-on:click="halamanSekarang(index+1)"
        >{{ index+1 }}</div>
      </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["TheQuestions"],
  data() {
    return {};
  },
  methods: {
    halamanSekarang: function (halaman) {
      this.$emit("changeHalaman", halaman);
    },
  },
};
</script>

<style lang="scss" scoped>
#container {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  justify-content: space-between;
}
.btn-container {
  margin: 0.2rem;
  padding: 0.2rem 1.25rem;
  font-size: 1.5rem;
}
.btn-container:active {
  background-color: rgba($color: black, $alpha: 0.05);
}
.background-done {
  background-color: #05a1dd;
}
.background-done:hover {
  background-color: #05a0ddb4;
}
.background-ragu {
  background-color: #ffcc2f;
}
.background-ragu:hover {
  background-color: #ffcb2fa9;
}
</style>