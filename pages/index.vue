<template>
  <div class="home">
    <main>
      <p>{{ this.$store.state.weather.isWeather }}</p>
      <p>{{ this.$route.params.index }}</p>
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

      <!-- <p v-if="$fetch">{{ cities }}</p> -->
      <!-- <showWeather
        v-if="this.$route.params.index"
        :displayWeather="cities[this.$route.params.index]"
      /> -->
      <!-- <showWeather v-if="showWeather" /> -->
      <showWeather v-if="$store.state.weather.isWeather" />
      <showWeather
        v-if="this.$route.params.index"
        :displayWeather="getAllWeather[this.$route.params.index]"
      />
      <!-- <p>{{ this.$store.state.weather.cities }}</p> -->

      <!-- <showError v-if="isError" /> -->
    </main>

    <!-- <p v-if="currentWeather">current: {{ currentWeather }}</p> -->
  </div>
</template>

<script>
import { mapMutations } from "vuex";
// import axios from "axios";
export default {
  // name: "Home",
  // components: { showWeather, showError },
  data() {
    return {
      query: "",
      // showWeather: false,
    };

    // },
    // computed: {
    //   ...mapState(["cities", "newQuery", "currentWeather", "isError"]),
    // },
    // methods: {
    //   ...mapMutations(["addToCities", "addNewQuery"]),
    //   ...mapActions(["fetchWeather"]),
    // },
  },
  computed: {
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
    // async getWeather() {
    //   const data = axios.get(
    //     `${this.$store.state.url_base}weather?q=${this.query}&units=metric&APPID=${this.$store.state.api_key}`
    //   );
    //   const result = await data;
    //   console.log(result);
    //   this.$store.commit("add", result);
    //   // [...this.$store.state.cities, result];

    // },
    async getWeather() {
      const data = await fetch(
        `${this.$store.state.url_base}weather?q=${this.query}&units=metric&APPID=${this.$store.state.api_key}`
      );
      const result = await data.json();
      console.log("result", result);
      this.$store.commit("weather/add", result);
      // this.showWeather = true;
      this.$store.commit("weather/changeIsWeather", true);
      console.log(this.$store.state.weather.isWeather);
      // this.query = "";
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
