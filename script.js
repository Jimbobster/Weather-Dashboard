// Function to get current weather data for a city
async function getCurrentWeather(city) {
    const apiKey = '9b9930a7106df81badb54c5976f6f846';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching current weather data:', error);
      return null;
    }
  }
  
  // Function to get 5-day forecast data for a city
  async function getForecast(city) {
    const apiKey = '9b9930a7106df81badb54c5976f6f846';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      return null;
    }
  }
  
  // Function to get weather icon class based on weather condition
  function getWeatherIconClass(weatherCondition) {
    switch (weatherCondition.toLowerCase()) {
      case 'clear':
        return 'wi wi-day-sunny';
      case 'clouds':
        return 'wi wi-cloudy';
      case 'rain':
        return 'wi wi-rain';
      case 'snow':
        return 'wi wi-snow';
      default:
        return 'wi wi-day-sunny';
    }
  }
  
  // Function to update the UI with current weather data
  function updateCurrentWeather(data) {

    // Update the UI with the current weather information
    const todaySection = document.getElementById('today');
    todaySection.innerHTML = `
      <h2>${data.name}</h2>
      <p>Date: ${dayjs().format('MMMM D, YYYY')}</p>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
      <p>Sunrise: ${dayjs.unix(data.sys.sunrise).format('h:mm A')}</p>
      <p>Sunset: ${dayjs.unix(data.sys.sunset).format('h:mm A')}</p>
      <i class="weather-icon ${getWeatherIconClass(data.weather[0].main)}"></i>
    `;
  }
  // Function to update the UI with the 5-day forecast data
  function updateForecast(data) {

    // Update the UI with the 5-day forecast information
    const forecastSection = document.getElementById('forecast');
    forecastSection.innerHTML = '';
  
    for (let i = 0; i < data.list.length; i += 8) {
      const day = data.list[i];
      forecastSection.innerHTML += `
        <div class="col-md-2">
          <p>Date: ${dayjs(day.dt_txt).format('MMMM D')}</p>
          <p>Temperature: ${day.main.temp}°C</p>
          <p>Humidity: ${day.main.humidity}%</p>
          <i class="weather-icon ${getWeatherIconClass(day.weather[0].main)}"></i>
        </div>
      `;
      
    }
  }
   // Function to save search history to local storage
function saveToLocalStorage(city) {
  let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
  history.push(city);
  localStorage.setItem('weatherHistory', JSON.stringify(history));
}

// Function to display search history from local storage
function displaySearchHistory() {
  const historyList = document.getElementById('history');
  historyList.innerHTML = '<h3>Location Search History</h3>';

  const history = JSON.parse(localStorage.getItem('weatherHistory')) || [];

  history.forEach((city) => {
    const listItem = document.createElement('a');
    listItem.href = '#';
    listItem.classList.add('list-group-item', 'list-group-item-action');
    listItem.textContent = city;
    listItem.addEventListener('click', async function () {
      // When a user clicks on a city in the search history, show current and future conditions
      updateCurrentWeather(await getCurrentWeather(city));
      updateForecast(await getForecast(city));
    });

    historyList.appendChild(listItem);
  });
}
// Event listener for the form
document.getElementById('search-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const searchInput = document.getElementById('search-input');
  const city = searchInput.value.trim();

  if (city === '') {
    alert('Please enter a city name.');
    return;
  }

  // Get current weather data
  const currentWeatherData = await getCurrentWeather(city);

  if (currentWeatherData) {
    // Update the UI with current weather data
    updateCurrentWeather(currentWeatherData);

    // Get 5-day forecast data
    const forecastData = await getForecast(city);

    if (forecastData) {
      // Update the UI with the 5-day forecast data
      updateForecast(forecastData);

      // Save the city to local storage
      saveToLocalStorage(city);

      // Add the city to the search history
      const historyList = document.getElementById('history');
      const listItem = document.createElement('a');
      listItem.href = '#';
      listItem.classList.add('list-group-item', 'list-group-item-action');
      listItem.textContent = city;
      listItem.addEventListener('click', async function () {
        // When a user clicks on a city in the search history, show current and future conditions
        updateCurrentWeather(await getCurrentWeather(city));
        updateForecast(await getForecast(city));
      });

      historyList.appendChild(listItem);
    }
  }
  // Display the search history
  displaySearchHistory();
});