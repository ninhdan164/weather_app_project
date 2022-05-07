//show current time
function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
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
  return `${day} ${hours}:${minutes
    .toString()
    .padStart(2, "0")}<br />${month} ${date}, ${year}`;
}

let currentTime = new Date();

let appDate = document.querySelector("#date");
appDate.innerHTML = formatDate(currentTime);

// weather API
function getInformation(response) {
  console.log(response.data);
  let city = document.querySelector(".city");
  city.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  let currentTemp = document.querySelector("#today-temp");
  currentTemp.innerHTML = Math.round(response.data.main.temp);

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

let form = document.querySelector("form");
form.addEventListener("submit", updateInformation);

getApi("Hanoi");

let button = document.querySelector("#current-button");
button.addEventListener("click", getPosition);

// change unit of temperature

/*function changeTempt(event) {
  event.preventDefault();
  let newtemp = temperature * 1.8 + 32;
  todayTemp.innerHTML = Math.round(newtemp);

  fahrenheit.classList.remove("changecolorgrey");
  fahrenheit.classList.add("changecolorblack");

  celsius.classList.remove("changecolorblack");
  celsius.classList.add("changecolorgrey");
}

function convertTemp(event) {
  event.preventDefault();
  todayTemp.innerHTML = temperature;

  celsius.classList.remove("changecolorgrey");
  celsius.classList.add("changecolorblack");

  fahrenheit.classList.remove("changecolorblack");
  fahrenheit.classList.add("changecolorgrey");
}

let temperature = 18;
let todayTemp = document.querySelector(".today-temp");
todayTemp.innerHTML = temperature;
let celsius = document.querySelector("a.C");
let fahrenheit = document.querySelector("a.F");

fahrenheit.addEventListener("click", changeTempt);
celsius.addEventListener("click", convertTemp);*/
