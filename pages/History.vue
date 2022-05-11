<template>
  <div class="history">
    <h1>Historia lokalizacji</h1>
    <!-- <p>{{ displayedCities }}</p> -->
    <p>{{ this.$store.state.weather.isWeather }}</p>
    <div>
      <ul class="history-list">
        <li
          v-for="(city, index) in displayedCities"
          :key="index"
          :data-index="index"
          @click="changeIsWeather"
        >
          <nuxt-link
            :to="{
              name: 'index',
              params: {
                index: index,
              },
            }"
          >
            {{ city.payload.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";

export default {
  // data() {
  //   return {
  //     history: [],
  //   };
  // },
  computed: {
    // ...mapState(["cities"]),
    displayedCities() {
      return this.$store.state.weather.cities;
    },
  },
  methods: {
    changeIsWeather() {
      this.$store.commit("weather/changeIsWeather", false);
      console.log(this.$store.state.weather.isWeather);
    },
  },
};
</script>

<style>
.history h1 {
  color: #333;
  font-weight: bold;
  text-align: center;
}
.history-list {
  margin-top: 20px;
  padding: 2em;
  font-size: 18px;
  border-radius: 5px;
  list-style: none;
  text-align: left;
}
.history-list li {
  padding: 0.5em 1em;
  border-bottom: 2px solid transparent;
  text-align: center;
}
.history-list a {
  color: inherit;
  border: none;
}
.history-list a:hover {
  color: black;
  font-weight: 400;
  cursor: pointer;
}
</style>
