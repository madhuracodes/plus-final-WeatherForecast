function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  timeElement.innerHTML = formatDate(date);

  windElement.innerHTML = response.data.wind.speed;

  humidityElement.innerHTML = response.data.temperature.humidity;

  descriptionElement.innerHTML = response.data.condition.description;

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
}
function initCity() {
  searchCity("Berlin");
}

function searchCity(city) {
  //   console.log("calling searchCity");
  let apiKey = "40912tb49034f3e73f11616ed1a9396o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios
    .get(apiUrl)
    .then(function (response) {
      refreshWeather(response);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

window.onload = function () {
  initCity();
};

function getForecast(city) {
  let apiKey = "40912tb49034f3e73f11616ed1a9396o";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  forecastHtml = "";

  response.data.daily.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-forecast-day">
            <div class="weather-forecast-date">Tue</div>
            <div class="weather-forecast-icon">🌤️</div>
            <div class="weather-forecast-temp">
              <div class="weather-forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}º</strong>
              </div>
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}º</div>
            </div>
          </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
displayForecast();
