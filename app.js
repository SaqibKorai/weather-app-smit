var weather = document.getElementById("weather");
var city = document.getElementById("city");
var weatherBox = document.getElementById("weatherBox");

function showWeatherBox() {
    weatherBox.style.display = 'block';
}

function getWeather() {
  var cityName = city.value.trim().toLowerCase();
  if (cityName.length === 0) {
    weather.innerHTML = "<p id='error-message'>Please enter a city name.</p>";
    return;
  }
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=392fc470c1ac8b42b2f40951a9a96cc4&units=metric`
  )
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      if (data.weather && data.weather[0]) {
        var weatherIcon = '';
        var weatherMain = data.weather[0].main.toLowerCase();

        if (weatherMain === 'clear') {
          weatherIcon = '☀️';
        } else if (weatherMain === 'clouds') {
          weatherIcon = '☁️';
        } else if (weatherMain === 'rain') {
          weatherIcon = '🌧️';
        } else if (weatherMain === 'snow') {
          weatherIcon = '❄️';
        } else if (weatherMain === 'thunderstorm') {
          weatherIcon = '⛈️';
        } else if (weatherMain === 'drizzle') {
          weatherIcon = '🌦️';
        } else if (weatherMain === 'mist') {
          weatherIcon = '🌫️';
        }

        weather.innerHTML = `
          <div class="weather-icon">${weatherIcon}</div>
          <h1 class="temp">${Math.round(data.main.temp)}°C</h1>
          <p class="city">${data.name}</p>
          <p class="description">${data.weather[0].main}</p>
          <div class="details">
            <p class="wind-speed">Wind: ${data.wind.speed} km/h</p>
            <p class="humidity">Humidity: ${data.main.humidity}%</p>
          </div>
        `;
      } else {
        weather.innerHTML = "<p id='error-message'>Invalid city name or weather data not available.</p>";
      }
    })
    .catch(function (err) {
      weather.innerHTML = `<p id='error-message'>Error: ${err.message}</p>`;
    });
}

function toggleTheme() {
    document.body.classList.toggle('light');

    const themeButton = document.getElementById('themeToggleBtn');
    if (document.body.classList.contains('light')) {
        themeButton.textContent = '🌞';
    } else {
        themeButton.textContent = '🌙';
    }
}
