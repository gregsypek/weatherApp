export const state = () => ({
  cities: [],
  isWeather: false,
  isError: false,
  errorMessage: "",
});

export const mutations = {
  ADD_WEATHER(state, payload) {
    state.cities.push({ payload });
  },

  TOGGLE_WEATHER(state, payload) {
    state.isWeather = payload;
  },

  ADD_ERROR(state, payload) {
    state.isError = true;
    state.errorMessage = payload;
  },
  TOGGLE_ERROR(state, payload) {
    state.isError = payload;
  },
};
