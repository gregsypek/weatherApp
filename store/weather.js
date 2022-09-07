export const state = () => ({
  cities: [],
  isWeather: false,
  isError: false,
  errorMessage: "",
  fromHistory: false,
});

export const mutations = {
  ADD_WEATHER(state, payload) {
    state.cities.push({ payload });
    console.log(
      "🚀 ~ file: weather.js ~ line 12 ~ ADD_WEATHER ~ payload",
      payload
    );
  },

  TOGGLE_WEATHER(state, payload) {
    state.isWeather = payload;
  },
  TOGGLE_HISTORY(state, payload) {
    state.fromHistory = payload;
  },

  ADD_ERROR(state, payload) {
    state.isError = true;
    state.errorMessage = payload;
  },
  TOGGLE_ERROR(state, payload) {
    state.isError = payload;
  },
};
