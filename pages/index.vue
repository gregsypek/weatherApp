<template>
  <div class="home">
    <main>
      <p>flag:{{ this.$store.state.weather.isWeather }}</p>
      <p>cities:{{ this.$store.state.weather.cities }}</p>
      <p>cities length:{{ this.$store.state.weather.cities.length }}</p>
      <p>index: {{ this.$route.params.index }}</p>
      <p>isError: {{ this.$store.state.weather.isError }}</p>
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
      <showWeather
        v-if="this.$route.params.index"
        :displayWeather="
          this.$store.state.weather.cities[this.$route.params.index]
        "
      />
      <showWeather
        v-else
        :displayWeather="
          this.$store.state.weather.cities[
            this.$store.state.weather.cities.length - 1
          ]
        "
      />
      <showError v-if="$store.state.weather.isError" />
    </main>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
// import axios from "axios";
export default {
  // name: "Home",
  data() {
    return {
      query: "",
      // showWeather: false,
    };
  },
  computed: {
    ...mapState(["isError"]),

    isWeather() {
      if (this.$store.state.cities.length) {
        this.showWeather = true;
      }
    },
    getAllWeather() {
      return this.$store.state.weather.cities;
    },
  },
  async fetch() {
    if (this.query !== "") {
      await this.getWeather();
    }
  },
  methods: {
    ...mapMutations({
      add: "weather/add",
    }),

    async getWeather() {
      try {
        const data = await fetch(
          `${this.$store.state.url_base}weather?q=${this.query}&units=metric&APPID=${this.$store.state.api_key}`
        );
        if (!data.ok)
          throw new Error("There is no weather for your city. Try again!");

        const result = await data.json();
        console.log("result", result);
        this.$store.commit("weather/add", result);
        // this.$store.commit("weather/changeIsWeather", true);
        console.log(this.$store.state.weather.isWeather);
      } catch (err) {
        console.error(err);
        this.$store.commit("weather/addNewError", err);
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
</style>
