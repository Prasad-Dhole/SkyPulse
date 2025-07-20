import React, { useState } from 'react';
import Map from './components/Map';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import SearchBar from './components/SearchBar';
import UnitToggle from './components/UnitToggle';

function App() {
  // Set Mumbai as default location
  const [location, setLocation] = useState({ 
    lat: 19.0760, 
    lon: 72.8777, 
    name: 'Mumbai',
    country: 'IN'
  });
  const [unit, setUnit] = useState('metric');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-weather-primary mb-2">
            SkyPulse App
          </h1>
          <p className="text-weather-secondary">
            Know your city's interactive weather map with real-time forecasts
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Map and Forecast */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                <SearchBar onLocationChange={setLocation} />
                <UnitToggle unit={unit} setUnit={setUnit} />
              </div>
              <Map location={location} setLocation={setLocation} />
            </div>
            <Forecast location={location} unit={unit} />
          </div>
          
          {/* Right Column - Current Weather */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <WeatherCard location={location} unit={unit} />
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-weather-secondary text-sm">
          <p>Built with React, MapLibre, and TailwindCSS | Weather App Project</p>
        </footer>
      </div>
    </div>
  );
}

export default App;