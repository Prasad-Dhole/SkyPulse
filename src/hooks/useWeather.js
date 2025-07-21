import { useState, useEffect } from 'react';
import { fetchCurrentWeather, fetchForecast } from '../utils/weatherutils';


export default function useWeather(location, unit) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [current, daily] = await Promise.all([
          fetchCurrentWeather(location, unit),
          fetchForecast(location, unit)
        ]);
        setWeather(current);
        setForecast(daily);
      } catch (err) {
        setError({
            message: err.response?.data?.message || 'Failed to fetch weather data',
            status: err.response?.status
          });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [location, unit]);

  return { weather, forecast, loading, error };
}