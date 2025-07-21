import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';


const Map = ({ location, setLocation }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map only once
    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://demotiles.maplibre.org/style.json',
        center: [location.lon, location.lat],
        zoom: 10
      });
      
      // Add navigation controls
      map.current.addControl(new maplibregl.NavigationControl());
      
      // Create draggable marker
      marker.current = new maplibregl.Marker({
        draggable: true,
        color: '#0284c7'
      })
        .setLngLat([location.lon, location.lat])
        .addTo(map.current);
      
      // Handle marker drag end
      marker.current.on('dragend', () => {
        const { lng, lat } = marker.current.getLngLat();
        setLocation(prev => ({
          ...prev,
          lat,
          lon: lng
        }));
      });
    }

    // Update marker position when location changes
    marker.current.setLngLat([location.lon, location.lat]);
    map.current.flyTo({
      center: [location.lon, location.lat],
      essential: true
    });

  }, [location, setLocation]);

  return (
    <div className="w-full h-80 md:h-96 rounded-lg overflow-hidden" ref={mapContainer} />
  );
};

export default Map;