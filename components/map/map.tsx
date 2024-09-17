// components/map/Map.tsx

import { MapContainer, TileLayer, Marker, Popup, Rectangle } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const fixLeafletMarker = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
};

// Define markers with lat, lng, and label
const markerPositions = [
  { lat: 26.9124, lng: 75.7873, label: 'Jaipur' },
  { lat: 26.8467, lng: 80.9462, label: 'Lucknow' }, 
  { lat: 28.7041, lng: 77.1025, label: 'Delhi' },
];



// Function to create bounds for rectangles
const getBounds = (lat: number, lng: number, size = 0.05): L.LatLngBoundsLiteral => {
  return [
    [lat - size, lng - size], // Southwest corner
    [lat + size, lng + size], // Northeast corner
  ];
};

const Map = () => {
  useEffect(() => {
    fixLeafletMarker();
  }, []);

  return (
    <MapContainer center={[26.9124, 75.7873]} zoom={6} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {markerPositions.map((position, idx) => (
        <div key={idx}>
          {/* Marker for each position */}
          <Marker position={[position.lat, position.lng]}>
            <Popup>{position.label}</Popup>
          </Marker>

          {/* Rectangle to highlight area around each marker */}
          <Rectangle
            bounds={getBounds(position.lat, position.lng)}
            pathOptions={{ color: 'red' }}
          />
        </div>
      ))}
    </MapContainer>
  );
};

export default Map;