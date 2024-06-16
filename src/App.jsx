import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherDisplay from './components/Weather/WeatherDisplay';

const defaultCities = ['New York', 'Tokyo', 'London'];

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(null);

  useEffect(() => {
    const fetchDefaultWeatherData = async () => {
      try {
        const promises = defaultCities.map(city => 
          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f540bd384e0bd85eb4d7df4803ba6161&units=metric`)
        );
        const responses = await Promise.all(promises);
        const data = responses.map(response => ({
          location: response.data.name,
          temperature: response.data.main.temp,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          humidity: response.data.main.humidity,
          windSpeed: response.data.wind.speed,
          condition: response.data.weather[0].main,
        }));
        setWeatherData(data);
      } catch (error) {
        alert('Error fetching default weather data');
      }
    };

    fetchDefaultWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f540bd384e0bd85eb4d7df4803ba6161&units=metric`);
      const newData = {
        location: response.data.name,
        temperature: response.data.main.temp,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
        condition: response.data.weather[0].main,
      };
      setWeatherData([newData, ...weatherData]);
      setHighlightIndex(0);
    } catch (error) {
      alert('Error fetching weather data');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className="app">
      <header>
        <h1>Weather App</h1>
        <label className="toggle-switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider"></span>
        </label>
      </header>
      <main>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city or zip code"
        />
        <button onClick={fetchWeatherData}>Get Weather</button>
        <div className="weather-grid">
          {weatherData.map((data, index) => (
            <WeatherDisplay weatherData={data} key={index} highlight={index === highlightIndex} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
