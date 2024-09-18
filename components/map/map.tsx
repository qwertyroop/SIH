import { MapContainer, TileLayer, Marker, Popup, Rectangle } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define the PlantLocation type
interface PlantLocation {
  lat: number;
  lng: number;
  label: string;
}

// Define markers with lat, lng, and label for each plant
const plantLocations: { [key: string]: PlantLocation[] } = {
  Banana: [
    { lat: 11.1271, lng: 78.6569, label: 'Tamil Nadu, India' },
    { lat: 19.7515, lng: 75.7139, label: 'Maharashtra, India' },
    { lat: 10.8505, lng: 76.2711, label: 'Kerala, India' },
    { lat: 15.9129, lng: 79.7400, label: 'Andhra Pradesh, India' },
    { lat: 22.2587, lng: 71.1924, label: 'Gujarat, India' },
    { lat: -1.8312, lng: -78.1834, label: 'Ecuador' },
    { lat: 9.7489, lng: -83.7534, label: 'Costa Rica' },
    { lat: 12.8797, lng: 121.7740, label: 'Philippines' },
    { lat: 4.5709, lng: -74.2973, label: 'Colombia' },
    { lat: -14.2350, lng: -51.9253, label: 'Brazil' },
  ],
  Alovera: [
    { lat: 26.9124, lng: 75.7873, label: 'Rajasthan, India' },
    { lat: 22.2587, lng: 71.1924, label: 'Gujarat, India' },
    { lat: 19.7515, lng: 75.7139, label: 'Maharashtra, India' },
    { lat: 11.1271, lng: 78.6569, label: 'Tamil Nadu, India' },
    { lat: 15.9129, lng: 79.7400, label: 'Andhra Pradesh, India' },
    { lat: 23.6345, lng: -102.5528, label: 'Mexico' },
    { lat: 28.2916, lng: -16.6291, label: 'Canary Islands, Spain' },
    { lat: 36.7783, lng: 119.4179, label: 'California, USA' },
    { lat: -30.5595, lng: 22.9375, label: 'South Africa' },
    { lat: -25.2744, lng: 133.7751, label: 'Australia' },
  ],
  Tulsi: [
    { lat: 25.3176, lng: 82.9739, label: 'Varanasi, Uttar Pradesh, India' },
    { lat: 22.5726, lng: 88.3639, label: 'Kolkata, West Bengal, India' },
    { lat: 12.9716, lng: 77.5946, label: 'Bangalore, Karnataka, India' },
    { lat: 28.6139, lng: 77.2090, label: 'Delhi, India' },
    { lat: 19.0760, lng: 72.8777, label: 'Mumbai, Maharashtra, India' },
    { lat: 9.9312, lng: 76.2673, label: 'Kochi, Kerala, India' },
    { lat: 20.2961, lng: 85.8245, label: 'Bhubaneswar, Odisha, India' },
    { lat: 36.7783, lng: -119.4179, label: 'California, USA' },
    { lat: 13.7563, lng: 100.5018, label: 'Bangkok, Thailand' },
    { lat: -33.8688, lng: 151.2093, label: 'Sydney, Australia' },
    { lat: 41.9028, lng: 12.4964, label: 'Rome, Italy' },
    { lat: 34.0522, lng: -118.2437, label: 'Los Angeles, USA' },
  ],
  Pine: [
    { lat: 60.4720, lng: 8.4689, label: 'Norway' },
    { lat: 45.4215, lng: -75.6972, label: 'Ottawa, Canada' },
    { lat: 38.8951, lng: -77.0369, label: 'Washington, D.C., USA' },
    { lat: 48.8566, lng: 2.3522, label: 'Paris, France' },
    { lat: 55.7558, lng: 37.6176, label: 'Moscow, Russia' },
    { lat: 35.6895, lng: 139.6917, label: 'Tokyo, Japan' },
    { lat: -34.6037, lng: -58.3816, label: 'Buenos Aires, Argentina' },
    { lat: 39.9042, lng: 116.4074, label: 'Beijing, China' },
    { lat: 52.5200, lng: 13.4050, label: 'Berlin, Germany' },
    { lat: 37.7749, lng: -122.4194, label: 'San Francisco, USA' },
  ],
  // Add more plants and their locations as needed
};

// Function to create bounds for rectangles
const getBounds = (lat: number, lng: number, size: number = 0.05): L.LatLngBoundsLiteral => {
  return [
    [lat - size, lng - size], // Southwest corner
    [lat + size, lng + size], // Northeast corner
  ];
};

const Map = ({ selectedPlant }: { selectedPlant: string }) => {
  useEffect(() => {
    // Fix leaflet marker icon issue
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  // Get locations for the selected plant
  const locations = plantLocations[selectedPlant] || [];

  // Default center for the map (can be adjusted as needed)
  const center: [number, number] = locations.length > 0
    ? [locations[0].lat, locations[0].lng]
    : [20.5937, 78.9629]; // Center of India as fallback

  return (
    <MapContainer center={center} zoom={1} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Render markers and rectangles based on the selected plant */}
      {locations.map((position: PlantLocation, idx: number) => (
        <div key={idx}>
          <Marker position={[position.lat, position.lng]}>
            <Popup>{position.label}</Popup>
          </Marker>
          <Rectangle
            bounds={getBounds(position.lat, position.lng)}
            pathOptions={{ color: 'green' }}
          />
        </div>
      ))}
    </MapContainer>
  );
};

export default Map;