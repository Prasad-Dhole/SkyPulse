import { useState } from 'react';
import { searchLocations } from '../utils/geoUtils';

export default function useLocationSearch() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await searchLocations(query);
      setSuggestions(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    suggestions,
    loading,
    error,
    handleSearch,
    setSuggestions
  };
}