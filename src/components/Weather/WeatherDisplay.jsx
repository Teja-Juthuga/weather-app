import React from 'react';
import './WeatherDisplay.css';

const getWeatherIcon = (condition) => {
  switch (condition) {
    case 'Clear':
      return 'wi-day-sunny';
    case 'Clouds':
      return 'wi-cloudy';
    case 'Rain':
      return 'wi-rain';
    case 'Snow':
      return 'wi-snow';
    case 'Thunderstorm':
      return 'wi-thunderstorm';
    case 'Drizzle':
      return 'wi-sprinkle';
    case 'Fog':
      return 'wi-fog';
    default:
      return 'wi-na';
  }
};

const WeatherDisplay = ({ weatherData, highlight }) => {
  const iconClass = getWeatherIcon(weatherData.condition);

  return (
    <div className={`weather-display ${highlight ? 'highlight' : ''}`}>
      <h1>{weatherData.location}</h1>
      <i className={`wi ${iconClass} weather-icon`}></i>
      <p>Temperature: {weatherData.temperature} °C</p>
      <p>Date: {weatherData.date}</p>
      <p>Time: {weatherData.time}</p>
      <p>Humidity: {weatherData.humidity}%</p>
      <p>Wind Speed: {weatherData.windSpeed} m/s</p>
    </div>
  );
};

export default WeatherDisplay;
