<template>
  <!-- serach results -->
  <div>
    <!-- <p>{{ this.$store.state.weather.cities[0] }}</p> -->
    <!-- <div class="weather-wrap" v-for="(weather, index) in weathers" :key="index">
      <div class="location-box">
        <div class="location">{{ weather.payload.name }}</div>
        <div class="date">{{ dateBuilder }}</div>
      </div>
      <div class="weather-box">
        <div class="des">{{ weather.payload.weather[0].description }}</div>
        <div class="tem">
          {{ Math.round(weather.payload.main.temp) }}<span>&#8451;</span>
        </div>
        <p>
          wschód słońca:
          {{
            new Date(weather.payload.sys.sunrise * 1000).toLocaleTimeString(
              "pl-PL"
            )
          }}
        </p>
        <p>
          zachód słońca:
          {{
            new Date(weather.payload.sys.sunset * 1000).toLocaleTimeString(
              "pl-PL"
            )
          }}
        </p>
      </div>
    </div> -->
    <div class="weather-wrap">
      <div class="location-box">
        <div class="location">{{ getLatestWeather.payload.name }}</div>
        <div class="date">{{ dateBuilder }}</div>
      </div>
      <div class="weather-box">
        <div class="des">
          {{ getLatestWeather.payload.weather[0].description }}
        </div>
        <div class="tem">
          {{ Math.round(getLatestWeather.payload.main.temp)
          }}<span>&#8451;</span>
        </div>
        <p>
          wschód słońca:
          {{
            new Date(
              getLatestWeather.payload.sys.sunrise * 1000
            ).toLocaleTimeString("pl-PL")
          }}
        </p>
        <p>
          zachód słońca:
          {{
            new Date(
              getLatestWeather.payload.sys.sunset * 1000
            ).toLocaleTimeString("pl-PL")
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    // TODO BOTH SYNTAX FOR mapGetters WORKS BUT WHICH ONE IS CORRECT?
    // ...mapGetters(["dateBuilder"]),
    ...mapGetters({
      dateBuilder: "dateBuilder",
    }),
    getLatestWeather() {
      return this.$store.state.weather.cities[
        this.$store.state.weather.cities.length - 1
      ];
    },
  },
};
</script>

<style>
/* styling results */
.location-box,
.weather-box {
  text-align: center;
}
.location-box {
  margin-block: 3rem;
}
.location-box .location {
  color: #333;
  font-size: 32px;
  font-weight: bold;
}
.location-box .date {
  text-align: center;
  color: #333;
  font-size: 20px;
  font-weight: normal;
  font-size: italic;
}
.weather-box .tem {
  text-align: center;
  padding-inline: 20px;
  color: #333;
  font-size: 100px;
  font-weight: bold;
  border-radius: 10px;
  margin-block: 30px;
}
.weather-box .des {
  font-size: 48px;
  text-transform: uppercase;
  margin-top: 1rem;
}
.weather-box .weather {
  text-align: center;
  color: #ddd;
  font-size: 40px;
  font-weight: bold;
}
</style>
