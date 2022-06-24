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
let h2 = document.querySelector(".date");
h2.innerHTML = `${day} ${hour}:${minutes}`;


function formatDate(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row">`;
  
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
    forecastHTML = forecastHTML + 
    `<div class="col-2 days">
          <div class="forecast-date">${formatDate(forecastDay.dt)}</div>
                  <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="42">
                  <div class="forecast-temp">
          <span class="forecast-temp-max">${Math.round(forecastDay.temp.max)}°</span>
          <span class="forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
         </div>
        </div>`;
    }
  });
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "d7249251d267baa5dd99efa5bfe85b6e";
  let lon = coordinates.lon;
  let lat = coordinates.lat;
  let Url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(Url).then(displayForecast);
}





function search(event) {
  event.preventDefault();
  let input = document.querySelector("#searchCity");
  let h1 = document.querySelector("#cityname");
  h1.innerHTML = `${input.value}`;
  let apiKey = "d7249251d267baa5dd99efa5bfe85b6e";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${apiKey}`;
  axios.get(url).then(temperature);
}


function temperature(response) {

  let h1 = document.querySelector(".temperature");
  tempCelcium = response.data.main.temp;
  let temp = Math.round(tempCelcium);
  h1.innerHTML = `${temp}`;
  let icon = document.querySelector("#icon");
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", response.data.weather[0].description);
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  getForecast(response.data.coord);
  let country = document.querySelector("#country");
  country.innerHTML = `${response.data.sys.country}`;
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
    let apiKey = "d7249251d267baa5dd99efa5bfe85b6e";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(weather);
  }
  navigator.geolocation.getCurrentPosition(location);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);
 
/*let button = document.querySelector("#cur");
button.addEventListener("click", current);
displayForecast();

function farenheit(event) {
event.preventDefault();
convertc.classList.remove("active");
convertf.classList.add("active");
let tempfar = tempCelcium*1.8+32;
let change = document.querySelector(".temperature");
change.innerHTML = Math.round(tempfar);
}
let convertf = document.querySelector("#farenheit");
convertf.addEventListener("click",farenheit);

function celcium(event) {
event.preventDefault()
convertf.classList.remove("active");
convertc.classList.add("active");
let tempc = Math.round(tempCelcium);
let change = document.querySelector(".temperature");
change.innerHTML = `${tempc}`;
}
let convertc = document.querySelector("#celcium");
convertc.addEventListener("click",celcium);
*/
