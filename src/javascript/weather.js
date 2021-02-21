const weather = document.querySelector(".js-weather");

const COORDS = "coords",
      API_KEY = "dba217bcf100d7891cd2ba8b01bd3b45";

function getWeather(lat, lng) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    const temperature = json.main.temp,
          place = json.name;

    weather.innerText = `${temperature}℃\n${place}`
  });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj) );
}

function handleGeosuccess(position) {
  const latitude = position.coords.latitude,
        longitude = position.coords.longitude;

  const coordsObj = {
    latitude,
    longitude
  };

  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleCeoError() {
  console.log("Error");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeosuccess, handleCeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);

  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();