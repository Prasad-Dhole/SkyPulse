import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const SearchBar = ({ onLocationChange }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchCities = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const apiKey = 'ad46b945066976ff4dd159b190c0e212'; // Same key as weather API
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${apiKey}`
      );
      
      setSuggestions(response.data.map(city => ({
        name: city.name,
        country: city.country,
        lat: city.lat,
        lon: city.lon
      })));
    } catch (err) {
      console.error('Geocoding API error:', err);
      setError('Failed to search cities');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchCities(query);
    }
  };

  const handleSelect = (city) => {
    onLocationChange({
      ...city,
      name: city.name,
      country: city.country
    });
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
          className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-weather-primary focus:border-transparent"
        />
        <button 
          type="submit"
          className="bg-weather-primary text-white px-4 py-2 rounded-r-lg hover:bg-weather-secondary transition"
        >
          <FaSearch />
        </button>
      </form>

      {/* Error message */}
      {error && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      )}

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((city, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex justify-between items-center"
              onClick={() => handleSelect(city)}
            >
              <div>
                <span className="font-medium">{city.name}</span>
                <span className="text-gray-500 ml-2">{city.country}</span>
              </div>
              <div className="text-xs text-gray-500">
                {city.lat.toFixed(2)}, {city.lon.toFixed(2)}
              </div>
            </div>
          ))}
          <div 
            className="px-4 py-2 border-t border-gray-200 text-center text-sm text-weather-primary hover:bg-blue-50 cursor-pointer"
            onClick={() => setSuggestions([])}
          >
            <FaTimes className="inline mr-1" /> Close
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="absolute top-3 right-14">
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-weather-primary"></div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;