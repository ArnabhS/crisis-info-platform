import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";
import axios from "axios";
import Loader from "../components/common/Loader";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 28.7041,
  lng: 77.1025,
};

export default function GoogleAlertsMap() {
  const [redZones, setRedZones] = useState([]);
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/red-zones`)
      .then((res) => {
        setRedZones([res.data]);
        setLoading(false); 
      })
      .catch((err) => {
        console.error("Red zones error:", err);
        setLoading(false); 
      });
  }, []);

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      {loading ? (
        <div ><Loader/></div> 
      ) : (
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={5}>
          {/* Red Zones as Polygons */}
          {redZones.map((zone, idx) => (
            <Polygon
              key={idx}
              paths={zone.coordinates.map((coord) => ({
                lat: coord.latitude,
                lng: coord.longitude,
              }))}
              options={{
                fillColor: "red",
                fillOpacity: 0.5,
                strokeColor: "red",
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
          ))}
        </GoogleMap>
      )}
    </LoadScript>
  );
}
