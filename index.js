let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${hour}:${minutes}`;

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#searchCity");
  let h1 = document.querySelector("#cityname");
  h1.innerHTML = `${input.value}`;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${apiKey}`;
  axios.get(url).then(temperature);
}
let form = document.querySelector("form");
form.addEventListener("submit", search);

function temperature(response) {
  let h1 = document.querySelector(".temperature");
  let temp = Math.round(response.data.main.temp);
  h1.innerHTML = `${temp}`;
}
function current(event) {
  event.preventDefault();
  function weather(response) {
    let h = document.querySelector(".temperature");
    let tem = Math.round(response.data.main.temp);
    h.innerHTML = `${tem}`;
    let city = document.querySelector("#cityname");
    city.innerHTML = `${response.data.name}`;
  }
  function location(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(weather);
  }
  navigator.geolocation.getCurrentPosition(location);
}
let button = document.querySelector("#cur");
button.addEventListener("click", current);

/*function farenheit(event) {
event.preventDefault()
let tempf = Math.round(23*1.8+32);
let change = document.querySelector(".temperature");
change.innerHTML = `${tempf}`;
}
let convertf = document.querySelector("#farenheit");
convertf.addEventListener("click",farenheit);

function celcium(event) {
event.preventDefault()
let tempc = Math.round((73.4-32)/1.8);
let change = document.querySelector(".temperature");
change.innerHTML = `${tempc}`;
}
let convertc = document.querySelector("#celcium");
convertc.addEventListener("click",celcium);
*/
