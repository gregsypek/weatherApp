export const state = () => ({
  cities: [],
  isWeather: false,
  isError: false,
  errorMessage: "",
});

export const mutations = {
  add(state, payload) {
    state.cities.push({ payload });
  },
  addNewQuery(state, payload) {
    state.newQuery = payload;
  },
  toggleIsError(state, payload) {
    state.isError = payload;
  },
  changeIsWeather(state, payload) {
    state.isWeather = payload;
  },

  addNewError(state, payload) {
    state.isError = true;
    state.errorMessage = payload;
  },
  hideError(state, payload) {
    state.isError = payload;
  },
};
