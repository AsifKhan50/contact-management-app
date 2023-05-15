import { TileLayer, MapContainer, GeoJSON, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { Path } from "leaflet";
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from "react";
import type { LatLngExpression } from "leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

const center = { lat: 0, lng: 0 };

const Map = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  function onEachFeature(feature: any, layer: L.Layer) {
    if (feature.properties) {
      const { country, active, recovered, deaths } = feature.properties;
  
      const latlng = (layer as L.GeoJSON).getBounds().getCenter();
  
      const marker = L.marker(latlng).addTo(layer as L.LayerGroup);
  
      const popupContent = `
        <div>
          <h3>${country}</h3>
          <p><b>Active:</b> ${active}</p>
          <p><b>Recovered:</b> ${recovered}</p>
          <p><b>Deaths:</b> ${deaths}</p>
        </div>
      `;
  
      marker.bindPopup(popupContent);
    }
  }
  

  return (
    <div className="map-div">
      <MapContainer
        style={{ height: "80vh" }}
        center={L.latLng(center.lat, center.lng)}
        zoom={2}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {data.length > 0 && data.map((country: any) => (
          <Marker
            key={country.country}
            position={[
              country.countryInfo.lat + 3.,
              country.countryInfo.long - 0.3,
            ]}
          >
            <Popup>
              <h3>{country.country}</h3>
              <p><strong>Active Cases:</strong> {country.active}</p>
              <p><strong>Recovered Cases:</strong> {country.recovered}</p>
              <p><strong>Deaths:</strong> {country.deaths}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
   

    </div>
  );
};

export default Map;
