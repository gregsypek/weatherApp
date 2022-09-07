export const state = () => ({
  api_key: "a9e58a19d0374ddd9a5108b9b5cef1e0",
  url_base: "https://api.openweathermap.org/data/2.5/",
});
export const getters = {
  dateBuilder() {
    const d = new Date();
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
