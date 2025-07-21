import axios from 'axios';
import { API_KEY } from './config';

export const searchLocations = async (query) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
    );
    return response.data.map(city => ({
      name: city.name,
      country: city.country,
      lat: city.lat,
      lon: city.lon
    }));
  } catch (error) {
    throw new Error('Failed to search locations: ' + error.message);
  }
};