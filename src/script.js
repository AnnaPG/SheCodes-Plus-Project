// function to get the sufix of the day
function getSufixDay(dayNumber) {
  if (dayNumber == 1) {
    return "st";
  } else if (dayNumber == 2) {
    return "nd";
  } else if (dayNumber == 3) {
    return "rd";
  } else {
    return "th";
  }
}

// Function to get the current date
function getCurrentDate(timestamp) {
  let currentDate = new Date(timestamp);

  console.log(currentDate);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let currentWeekDay = days[currentDate.getDay()];
  let currentDay = currentDate.getDate();
  let currentSufixDay = getSufixDay(currentDay);
  let currentMonth = months[currentDate.getMonth()];
  let currentHour = String(currentDate.getHours()).padStart(2, "0");
  let currentMinutes = String(currentDate.getMinutes()).padStart(2, "0");

  return `<i class="fa-solid fa-calendar-day details-icon"></i> ${currentWeekDay} ${currentDay}${currentSufixDay} ${currentMonth} ${currentHour}:${currentMinutes}`;
}

// Function to set our icons using the API code
function getMainIcon(code) {
  if (code == "01d") {
    return `<i class="fa-solid fa-sun main-icon"></i>`;
  } else if (code == "02d") {
    return `<i class="fa-solid fa-cloud-sun main-icon"></i>`;
  } else if (code == "03d" || code == "04d" || code == "03n" || code == "04n") {
    return `<i class="fa-solid fa-cloud main-icon"></i>`;
  } else if (code == "09d" || code == "09n") {
    return `<i class="fa-solid fa-cloud-rain main-icon"></i>`;
  } else if (code == "10d") {
    return `<i class="fa-solid fa-cloud-sun-rain main-icon"></i>`;
  } else if (code == "11d" || code == "11n") {
    return `<i class="fa-solid fa-cloud-bolt main-icon"></i>`;
  } else if (code == "13d" || code == "13n") {
    return `<i class="fa-solid fa-snowflake main-icon"></i>`;
  } else if (code == "50d" || code == "50n") {
    return `<i class="fa-solid fa-smog main-icon"></i>`;
  } else if (code == "01n") {
    return `<i class="fa-solid fa-moon main-icon"></i>`;
  } else if (code == "02n") {
    return `<i class="fa-solid fa-cloud-moon main-icon"></i>`;
  } else if (code == "10n") {
    return `<i class="fa-solid fa-cloud-moon-rain main-icon"></i>`;
  } else {
    return alert("Icon code not found");
  }
}

// Function to diplay the forecast
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Mon", "Tues", "Wed", "Thu", "Fry"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
      <div class="days-details-date">${day}</div>
      <i class="fa-solid fa-cloud weather-icon"></i>
      <div class="days-details-temp">
        <span class="days-details-temp-max">25º</span>
        <span class="days-details-temp-min">18º</span>
      </div>
    </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Function to update the temperature
function updateWeather(response) {
  event.preventDefault();
  // Update city value
  document.querySelector("#city").innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;
  // Update temperature value
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemperature);
  // Update humidity value
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  // Update wind value
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  // Update temp max value
  document.querySelector("#temp-max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  // Update temp min value
  document.querySelector("#temp-min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  // Update description value
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  // Update weather-icon
  document.querySelector("#main-icon").innerHTML = getMainIcon(
    response.data.weather[0].icon
  );

  // Update date-time
  document.querySelector("#date-time").innerHTML = getCurrentDate(
    response.data.dt * 1000
  );

  // Update forecast
  displayForecast();
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "6f088eede7364dfafcf3d7dd6015c1e1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(updateWeather);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input").value;
  searchCity(city);

  document.querySelector("#city-input").value = "";
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSubmit);

// Function to change units in temperature
function getCelciusTemp(event) {
  farenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  event.preventDefault();
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = Math.round(celsiusTemperature);
}

function getFarenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  farenheitTemp = Math.round(celsiusTemperature * 1.8 + 32);
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = farenheitTemp;
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#link-celsius");
celsiusLink.addEventListener("click", getCelciusTemp);

let farenheitLink = document.querySelector("#link-farenheit");
farenheitLink.addEventListener("click", getFarenheitTemp);

// Function to update data in current position
function searchLocation(location) {
  let units = "metric";
  let apiKey = "6f088eede7364dfafcf3d7dd6015c1e1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(updateWeather);
}

function updateCurrentLocationData(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", updateCurrentLocationData);

searchCity("Barcelona");

// Function to trigger a button click on enter in city-input
function pressEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("#search-button").click();
    document.querySelector("#city-input").value = "";
  }
}
let cityInput = document.querySelector("#city-input");
cityInput.addEventListener("keypress", pressEnter);
