function search(event) {
  event.preventDefault();
  searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;

  let city = searchInputElement.value;
  let apiKey = "deb734a4a90t54bo80eaa3af0c4619aa";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then((response) => {
    getData(response);
  });
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function getData(response) {
  let temperature = Math.round(response.data.temperature.current);
  let weather = document.querySelector("#temperature");
  let iconElement = document.querySelector(".current-temperature-icon");
  weather.innerHTML = temperature;

  let weatherCondition = response.data.condition;

  if (weatherCondition) {
    let iconUrl = weatherCondition.icon_url;
    let iconAlt = weatherCondition.description;

    // Update icon with the image using a CSS class
    iconElement.innerHTML = `<img src="${iconUrl}" alt="${iconAlt}" class="weather-icon" style="width: 65px; height: 65px" />`;
  }

  let time = response.data.time;
  let currentDate = new Date(time * 1000);
  let formattedDate = formatDate(currentDate);

  // Update date in the HTML
  let dateElement = document.querySelector("#current-date");
  dateElement.innerHTML = formattedDate;

  // Update other weather details
  let description = response.data.condition.description;
  let descriptionData = document.querySelector("#description");
  descriptionData.innerHTML = description;

  let humidity = response.data.temperature.humidity;
  let humidityData = document.querySelector("#humidity");
  humidityData.innerHTML = humidity;

  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedData = document.querySelector("#wind-speed");
  windSpeedData.innerHTML = windSpeed;
}

let searchInputElement;
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);
