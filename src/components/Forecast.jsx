import React, { useState, useEffect } from 'react';
import { WiDaySunny, WiRain, WiCloudy, WiSnow } from 'react-icons/wi';
import axios from 'axios';

const Forecast = ({ location, unit }) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        const apiKey = 'ad46b945066976ff4dd159b190c0e212'; // Replace with your key
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=${unit}&appid=${apiKey}`
        );
        
        // Filter to one forecast per day
        const dailyForecast = [];
        const dates = new Set();
        
        response.data.list.forEach(item => {
          const date = item.dt_txt.split(' ')[0];
          if (!dates.has(date) && dates.size < 5) {
            dates.add(date);
            dailyForecast.push(item);
          }
        });
        
        setForecast(dailyForecast);
      } catch (error) {
        console.error('Error fetching forecast:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [location, unit]);

  const getWeatherIcon = (main) => {
    switch(main) {
      case 'Clear':
        return <WiDaySunny className="text-yellow-400" size={36} />;
      case 'Rain':
        return <WiRain className="text-blue-400" size={36} />;
      case 'Clouds':
        return <WiCloudy className="text-gray-400" size={36} />;
      case 'Snow':
        return <WiSnow className="text-blue-200" size={36} />;
      default:
        return <WiDaySunny className="text-yellow-400" size={36} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-weather-primary mb-4">5-Day Forecast</h2>
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-weather-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-weather-primary mb-4">5-Day Forecast</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div key={index} className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
            <p className="font-medium text-weather-secondary">
              {formatDate(day.dt_txt)}
            </p>
            <div className="my-2">
              {getWeatherIcon(day.weather[0].main)}
            </div>
            <p className="text-lg font-bold text-weather-primary">
              {Math.round(day.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
            </p>
            <p className="text-sm text-weather-secondary capitalize">
              {day.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;