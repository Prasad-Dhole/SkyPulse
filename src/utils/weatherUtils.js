import axios from 'axios';
import { API_KEY } from '../utils/config';

export const fetchCurrentWeather = async (location, unit) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=${unit}&appid=${API_KEY}`
  );
  return response.data;
};

export const fetchForecast = async (location, unit) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=${unit}&appid=${API_KEY}`
  );
  // Process to daily forecast (your existing logic)
  return response.data.list.filter((item, index) => index % 8 === 0).slice(0, 5);
};