import React, { useState, useEffect } from 'react';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm } from 'react-icons/wi';
import axios from 'axios';
import { API_KEY } from '../utils/config';
import useWeather from '../hooks/useWeather';

const WeatherCard = ({ location, unit }) => {
  const { weather, loading, error } = useWeather(location, unit);

  const getWeatherIcon = () => {
    if (!weather) return null;
    
    const main = weather.weather[0].main;
    const size = 64;
    
    switch(main) {
      case 'Clear':
        return <WiDaySunny className="text-yellow-400" size={size} />;
      case 'Rain':
        return <WiRain className="text-blue-400" size={size} />;
      case 'Clouds':
        return <WiCloudy className="text-gray-400" size={size} />;
      case 'Snow':
        return <WiSnow className="text-blue-200" size={size} />;
      case 'Thunderstorm':
        return <WiThunderstorm className="text-purple-500" size={size} />;
      default:
        return <WiDaySunny className="text-yellow-400" size={size} />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-weather-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-weather-primary text-white rounded-lg"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-weather-primary">
          {location.name}, {location.country}
        </h2>
        <p className="text-weather-secondary capitalize">
          {weather.weather[0].description}
        </p>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="text-5xl font-bold text-weather-primary mr-4">
          {Math.round(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
        </div>
        <div>{getWeatherIcon()}</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-weather-secondary">Humidity</p>
          <p className="text-xl font-bold">{weather.main.humidity}%</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-weather-secondary">Wind</p>
          <p className="text-xl font-bold">
            {weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-weather-secondary">Feels Like</p>
          <p className="text-xl font-bold">
            {Math.round(weather.main.feels_like)}°{unit === 'metric' ? 'C' : 'F'}
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-weather-secondary">Pressure</p>
          <p className="text-xl font-bold">{weather.main.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;