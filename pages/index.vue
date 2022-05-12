<template>
  <div class="home">
    <main>
      <!-- FOR SHOWING WHAT IS WHAT -->

      <!-- <p>flag:{{ this.$store.state.weather.isWeather }}</p>
      <p>cities:{{ this.$store.state.weather.cities }}</p>
      <p>cities length:{{ this.$store.state.weather.cities.length }}</p>
      <p>index: {{ this.$route.params.index }}</p>
      <p>isError: {{ this.$store.state.weather.isError }}</p> -->

      <!-- search input -->
      <form @submit.prevent="$fetch" class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="Enter city..."
          v-model.lazy="query"
          required
        />
        <button>Search</button>
      </form>
      <div class="weather">
        <!-- Loading Animation -->
        <Loading v-if="$fetchState.pending" />
        <showWeather
          v-if="this.$route.params.index >= 0"
          :displayWeather="allWeather[this.$route.params.index]"
        />
        <showWeather
          v-else
          :displayWeather="allWeather[allWeather.length - 1]"
        />
        <showError v-if="$store.state.weather.isError" />
      </div>
    </main>
  </div>
</template>

<script>
import { nanoid } from "nanoid";

import { mapMutations, mapState } from "vuex";
// import axios from "axios";
export default {
  // name: "Home",
  data() {
    return {
      query: "",
      index: null,
    };
  },
  computed: {
    ...mapState(["isError"]),
    allWeather() {
      return this.$store.state.weather.cities;
    },
  },
  fetchDelay: 1000,
  async fetch() {
    if (this.query !== "") {
      await this.getWeather();
    } else {
      this.index = this.$route.params.index;
    }
  },
  methods: {
    ...mapMutations({
      ADD_WEATHER: "weather/ADD_WEATHER",
    }),

    async getWeather() {
      try {
        const data = await fetch(
          `${this.$store.state.url_base}weather?q=${this.query}&units=metric&APPID=${this.$store.state.api_key}`
        );
        if (!data.ok)
          throw new Error("There is no weather for your city. Try again!");

        const result = await data.json();
        // destructuring from object
        const {
          name,
          weather: [{ description }],
          main: { temp },
          sys: { sunrise },
          sys: { sunset },
        } = result;

        // console.log(name, description, temp, sunrise, sunset);
        const obj = {
          id: nanoid(10),
          name,
          description,
          temp,
          sunrise,
          sunset,
        };
        // console.log("result", result);
        this.$store.commit("weather/ADD_WEATHER", obj);
        // this.$store.commit("weather/TOGGLE_WEATHER", true);
      } catch (err) {
        console.error(err);
        this.$store.commit("weather/ADD_ERROR", err);
      }
      this.query = "";
    },
  },
};
</script>

<style>
.search-box {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 30px;
}
.search-box .search-bar {
  width: 100%;
  max-width: 200px;
  padding: 15px;
  color: inherit;
  font-size: 20px;
  border: 2px solid #808080;
  outline: none;
  border-radius: 5px;
}
.search-box .search-bar:focus {
  background-color: #fff;
  border: 2px solid #333;
}
.search-box button {
  padding: 0.5em 1.5em;
  font-size: 18px;
  background-color: darkgrey;
  color: #333;
  margin-left: 1rem;
  border-radius: 5px;
}
.search-box button:hover,
.search-box button:focus {
  background-color: #9d9d9d;
}
.weather {
  position: relative;
}
</style>
