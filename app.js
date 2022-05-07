//show current time
function formatDate(time) {
  let now = new Date(time);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let date = now.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  return `${day} ${hours}:${minutes}<br />${month} ${date}, ${year}`;
}

let currentTime = new Date();

// weather API
function getInformation(response) {
  console.log(response.data);
  todayTemperature = response.data.main.temp;
  let currentTemp = document.querySelector("#today-temp");
  currentTemp.innerHTML = Math.round(todayTemperature);

  let city = document.querySelector(".city");
  city.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  let todayDescription = document.querySelector("#description");
  todayDescription.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  let iconElement = document.querySelector(".today-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let appDate = document.querySelector("#date");
  appDate.innerHTML = formatDate(response.data.dt * 1000);
}
function getApi(city) {
  let apiKey = `245cfd044fd3ce558ead6cf2d614aba8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getInformation);
}

function updateInformation(event) {
  event.preventDefault();
  let searchElement = document.querySelector(".input-city");

  getApi(searchElement.value);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `245cfd044fd3ce558ead6cf2d614aba8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getInformation);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#today-temp");
  currentTemp.innerHTML = Math.round((todayTemperature * 9) / 5 + 32);

  fahrenheit.classList.remove("unactive");
  fahrenheit.classList.add("active");

  celsius.classList.remove("active");
  celsius.classList.add("unactive");
}

function convertToCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#today-temp");
  currentTemp.innerHTML = Math.round(todayTemperature);

  celsius.classList.remove("unactive");
  celsius.classList.add("active");

  fahrenheit.classList.remove("active");
  fahrenheit.classList.add("unactive");
}
let form = document.querySelector("form");
form.addEventListener("submit", updateInformation);

getApi("Hanoi");

let button = document.querySelector("#current-button");
button.addEventListener("click", getPosition);

let todayTemperature = null;

// change unit of temperature

let celsius = document.querySelector("a.C");
let fahrenheit = document.querySelector("a.F");

fahrenheit.addEventListener("click", convertToFahrenheit);
celsius.addEventListener("click", convertToCelsius);
