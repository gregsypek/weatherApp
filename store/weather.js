export const state = () => ({
  cities: [],
  isWeather: false,
  isError: false,
  errorMessage: "",
});

export const mutations = {
  // state is automaticcally added by vuex
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
// Actions can do a number of different things including combining data, fetching data, and running JavaScript logic
// actions allows us to call specific mutation with asynchronous code
// context contains everything that is basically inside our store and has special method called commit
export const actions = {
  async fetchWeather(context) {
    try {
      // Example on how to make an API call using  API key is on Readme.md
      // context.commit("addNewQuery");
      // console.log("what context includes", context.state);
      const res = await fetch(
        `${context.state.url_base}weather?q=${context.state.newQuery}&units=metric&APPID=${context.state.api_key}`
      );
      if (!res.ok)
        throw new Error("There is no weather for your city. Try again!");
      const data = await res.json();
      // console.log('data', data)
      context.commit("addToCities", data);
    } catch (err) {
      // console.error(err)
      context.commit("addNewError", err);
    }
  },
};
