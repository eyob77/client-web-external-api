import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import axios from "axios";

function ClickableMap() {
  const [position, setPosition] = useState(null);
  const [weather, setWeather] = useState(null);

  function LocationMarker() {
  const [position, setPosition] = useState(null);
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (lat,lng) => {
    try {
      const res = await axios.post(`https://localhost:5000/weather`,{lat,lng});
      setWeather(res.data);
    } catch (error) {
      console.log("Error connecting to backend:", error);
      alert("Error fetching weather");
    }
  };

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      fetchWeather(lat, lng);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        {weather ? `Temp: ${weather.temperature}°C` : "Loading..."}
      </Popup>
    </Marker>
  );
}


  return (
    <MapContainer id="map" center={[0, 0]} zoom={2} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}

export default ClickableMap;
