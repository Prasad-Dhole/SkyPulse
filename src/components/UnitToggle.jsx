import React from 'react';

const UnitToggle = ({ unit, setUnit }) => {
  const handleToggle = () => {
    // Toggle between metric (C) and imperial (F)
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
  };

  return (
    <div className="flex items-center">
      <span className={`mr-2 ${unit === 'metric' ? 'font-bold text-weather-primary' : 'text-gray-400'}`}>°C</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          className="sr-only peer" 
          checked={unit === 'imperial'}
          onChange={handleToggle}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-weather-primary"></div>
      </label>
      <span className={`ml-2 ${unit === 'imperial' ? 'font-bold text-weather-primary' : 'text-gray-400'}`}>°F</span>
    </div>
  );
};

export default UnitToggle;