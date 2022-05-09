// import { createStore } from 'vuex'

export const state = () => ({
  // State is a collection of data at a given time. This state can be changed with user interactions via dispatch and commit methods. When the user modifies data, a dispatch event is executed, which passes data to a mutation and updates the state object.

  api_key: "a9e58a19d0374ddd9a5108b9b5cef1e0",
  url_base: "http://api.openweathermap.org/data/2.5/",
  newQuery: "",
  weather: {},
  date: null,
  cities: [],
  isError: false,
  errorMessage: "",
});
// A getter is a way to combine multiple state values into a single value.
// hink of Vuex getters as computed properties for your Vuex store
export const getters = {
  dateBuilder(state) {
    const d = new Date();
    state.date = d;
    const months = [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ];
    const days = [
      "Niedziela",
      "Poniedziałek",
      "Wtorek",
      "Środa",
      "Czwartek",
      "Piątek",
      "Sobota",
    ];
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    const time = d.toLocaleTimeString("pl-PL");
    return `${day} ${date} ${month} ${year}
			${time}`;
  },
};
// mutations have one job and one job only: update the store
export const mutations = () => ({
  // state is automaticcally added by vuex
  addToCities(state, payload) {
    state.cities.push(payload);
  },
  addNewQuery(state, payload) {
    state.newQuery = payload;
  },
  toggleIsError(state, payload) {
    state.isError = payload;
  },

  addNewError(state, payload) {
    state.isError = true;
    state.errorMessage = payload;
  },
});
// Actions can do a number of different things including combining data, fetching data, and running JavaScript logic
// actions allows us to call specific mutation with asynchronous code
// context contains everything that is basically inside our store and has special method called commit
export const actions = () => ({
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

  hideError(context) {
    context.commit("toggleIsError", false);
  },
});
