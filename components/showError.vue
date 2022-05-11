<template>
  <h2 class="error">{{ this.$store.state.weather.errorMessage }}</h2>
</template>

<script>
// import { mapState, mapActions } from "vuex";
export default {
  // computed: {
  //   ...mapState(["errorMessage"]),
  // },
  // methods: {
  //   ...mapActions(["TOGGLE_ERROR"]),
  // },
  mounted() {
    setTimeout(() => {
      this.$store.commit("weather/TOGGLE_ERROR", false);
    }, 3000);
  },
};
</script>

<style>
.error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 3rem;
  width: max-content;
  height: max-content;
  background: white;
  border: 1px solid #333;
  color: orangered;
}
</style>
