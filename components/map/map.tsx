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
  LantanaBloussum: [
    { lat: 20.5937, lng: 78.9629, label: 'India (various regions)' },
    { lat: -25.2744, lng: 133.7751, label: 'Australia' },
    { lat: -14.2350, lng: -51.9253, label: 'Brazil' },
    { lat: 4.5709, lng: -74.2973, label: 'Colombia' },
    { lat: 15.8700, lng: 100.9925, label: 'Thailand' },
    { lat: 9.7489, lng: -83.7534, label: 'Costa Rica' },
    { lat: 21.4735, lng: -78.6569, label: 'Cuba' },
    { lat: 7.8731, lng: 80.7718, label: 'Sri Lanka' },
    { lat: 12.8797, lng: 121.7740, label: 'Philippines' },
    { lat: 23.6345, lng: -102.5528, label: 'Mexico' }
  ], 
  Basill: [
    { lat: 41.8719, lng: 12.5674, label: 'Italy' },
    { lat: 37.9838, lng: 23.7275, label: 'Greece' },
    { lat: 30.0444, lng: 31.2357, label: 'Cairo, Egypt' },
    { lat: 15.8700, lng: 100.9925, label: 'Thailand' },
    { lat: 40.4637, lng: -3.7492, label: 'Spain' },
    { lat: 19.4326, lng: -99.1332, label: 'Mexico City, Mexico' },
    { lat: 34.8021, lng: 38.9968, label: 'Syria' },
    { lat: 20.5937, lng: 78.9629, label: 'India (various regions)' },
    { lat: 39.0742, lng: 21.8243, label: 'Greece (other regions)' },
    { lat: 38.9637, lng: 35.2433, label: 'Turkey' }
  ],   
  WithaniaSomnifera: [
    { lat: 23.2599, lng: 77.4126, label: 'Madhya Pradesh, India' },
    { lat: 22.9734, lng: 78.6569, label: 'Madhya Pradesh, India' },
    { lat: 28.7041, lng: 77.1025, label: 'Uttar Pradesh, India' },
    { lat: 24.5854, lng: 73.7125, label: 'Rajasthan, India' },
    { lat: 23.0339, lng: 72.5850, label: 'Gujarat, India' },
    { lat: 26.9124, lng: 75.7873, label: 'Jaipur, Rajasthan, India' },
    { lat: 27.1767, lng: 78.0081, label: 'Agra, Uttar Pradesh, India' },
    { lat: 30.3753, lng: 69.3451, label: 'Pakistan' },
    { lat: 20.5937, lng: 78.9629, label: 'India (various regions)' }
  ],  
  Thumba: [
    { lat: 8.5241, lng: 76.9366, label: 'Thiruvananthapuram, Kerala, India' },
    { lat: 19.7515, lng: 75.7139, label: 'Maharashtra, India' },
    { lat: 28.7041, lng: 77.1025, label: 'Delhi, India' },
    { lat: 26.8467, lng: 80.9462, label: 'Uttar Pradesh, India' },
    { lat: 23.1815, lng: 79.9864, label: 'Madhya Pradesh, India' },
    { lat: 30.7333, lng: 76.7794, label: 'Chandigarh, India' },
    { lat: 24.5854, lng: 73.7125, label: 'Rajasthan, India' },
    { lat: 13.0827, lng: 80.2707, label: 'Chennai, Tamil Nadu, India' },
    { lat: 22.7196, lng: 75.8577, label: 'Indore, Madhya Pradesh, India' },
    { lat: 18.5204, lng: 73.8567, label: 'Pune, Maharashtra, India' },
  ],
  Poovarshu: [
    { lat: 10.8505, lng: 76.2711, label: 'Kerala, India' },
    { lat: 13.0827, lng: 80.2707, label: 'Chennai, Tamil Nadu, India' },
    { lat: 12.2958, lng: 76.6394, label: 'Mysuru, Karnataka, India' },
    { lat: 9.9391, lng: 78.1217, label: 'Madurai, Tamil Nadu, India' },
    { lat: 17.3850, lng: 78.4867, label: 'Hyderabad, Telangana, India' },
    { lat: 15.3173, lng: 75.7139, label: 'Karnataka, India' },
    { lat: 11.0168, lng: 76.9558, label: 'Coimbatore, Tamil Nadu, India' },
    { lat: 16.5062, lng: 80.6480, label: 'Vijayawada, Andhra Pradesh, India' },
    { lat: 8.0883, lng: 77.5385, label: 'Kanyakumari, Tamil Nadu, India' },
    { lat: 11.9139, lng: 79.8145, label: 'Puducherry, India' },
  ],
  Bacopa: [
    { lat: 26.9124, lng: 75.7873, label: 'Jaipur, Rajasthan, India' },
    { lat: 23.0225, lng: 72.5714, label: 'Ahmedabad, Gujarat, India' },
    { lat: 19.0760, lng: 72.8777, label: 'Mumbai, Maharashtra, India' },
    { lat: 25.3176, lng: 82.9739, label: 'Varanasi, Uttar Pradesh, India' },
    { lat: 13.0827, lng: 80.2707, label: 'Chennai, Tamil Nadu, India' },
    { lat: 15.2993, lng: 74.1240, label: 'Goa, India' },
    { lat: 27.1767, lng: 78.0081, label: 'Agra, Uttar Pradesh, India' },
    { lat: 21.1702, lng: 72.8311, label: 'Surat, Gujarat, India' },
    { lat: 24.5854, lng: 73.7125, label: 'Udaipur, Rajasthan, India' },
    { lat: 23.2500, lng: 77.4160, label: 'Bhopal, Madhya Pradesh, India' },
  ],
  Fatboi: [
    { lat: 22.5726, lng: 88.3639, label: 'Kolkata, West Bengal, India' },
    { lat: 24.5854, lng: 73.7125, label: 'Udaipur, Rajasthan, India' },
    { lat: 25.3960, lng: 78.1307, label: 'Jhansi, Uttar Pradesh, India' },
    { lat: 17.6868, lng: 83.2185, label: 'Visakhapatnam, Andhra Pradesh, India' },
    { lat: 19.7515, lng: 75.7139, label: 'Maharashtra, India' },
    { lat: 35.4437, lng: 139.6380, label: 'Yokohama, Japan' },
    { lat: 23.6345, lng: -102.5528, label: 'Mexico' },
    { lat: 32.7767, lng: -96.7970, label: 'Texas, USA' },
    { lat: -33.9189, lng: 18.4233, label: 'Cape Town, South Africa' },
    { lat: 37.9838, lng: 23.7275, label: 'Athens, Greece' },
  ],
  Aloevera: [
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
    { lat: 30.0668, lng: 79.0193, label: 'Uttarakhand, India' },
    { lat: 32.2190, lng: 76.3234, label: 'Kangra, Himachal Pradesh, India' },
    { lat: 34.0837, lng: 74.7973, label: 'Srinagar, Jammu and Kashmir, India' },
    { lat: 31.1048, lng: 77.1734, label: 'Shimla, Himachal Pradesh, India' },
    { lat: 33.7782, lng: 76.5762, label: 'Leh, Ladakh, India' },
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