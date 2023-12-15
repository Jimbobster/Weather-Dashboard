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
  
