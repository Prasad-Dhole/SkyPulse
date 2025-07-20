import React from 'react';

const UnitToggle = ({ unit, setUnit }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className={`font-medium ${unit === 'metric' ? 'text-weather-primary' : 'text-gray-400'}`}>
        °C
      </span>
      
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          className="sr-only peer"
          checked={unit === 'imperial'}
          onChange={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-weather-primary"></div>
      </label>
      
      <span className={`font-medium ${unit === 'imperial' ? 'text-weather-primary' : 'text-gray-400'}`}>
        °F
      </span>
    </div>
  );
};

export default UnitToggle;