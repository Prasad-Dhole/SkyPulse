import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import useLocationSearch from '../hooks/useLocationSearch';

const SearchBar = ({ onLocationChange }) => {
  const [query, setQuery] = useState('');
  const { 
    suggestions, 
    loading, 
    error, 
    handleSearch, 
    setSuggestions 
  } = useLocationSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
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
      <form onSubmit={handleSubmit} className="flex">
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

      {error && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      )}

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

      {loading && (
        <div className="absolute top-3 right-14">
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-weather-primary"></div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;