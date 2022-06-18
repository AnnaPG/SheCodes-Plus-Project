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
function getCurrentDate() {
  let currentDate = new Date();

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
  console.log(currentMinutes);

  let dateTime = document.querySelector("#date-time");
  dateTime.innerHTML = `<i class="fa-solid fa-calendar-day details-icon"></i> ${currentWeekDay} ${currentDay}${currentSufixDay} ${currentMonth} ${currentHour}:${currentMinutes}`;
}

getCurrentDate();

// Function to update the temperature
function updateWeather(response) {
  event.preventDefault();
  // Update city value
  document.querySelector("#city").innerHTML = response.data.name;
  // Update temperature value
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
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

  console.log(response.data);
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
  event.preventDefault();
  temp = 66;
  celsiusTemp = Math.round(((temp - 32) * 5) / 9);
  console.log(celsiusTemp);
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = `${celsiusTemp}`;
}

function getFarenheitTemp(event) {
  event.preventDefault();
  temp = 21;
  farenheitTemp = Math.round(temp * 1.8 + 32);
  console.log(farenheitTemp);
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = `${farenheitTemp}`;
}

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
