import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fly to selected location
function FlyTo({ selectedEq }) {
  const map = useMap();
  useEffect(() => {
    if (selectedEq) {
      map.flyTo(selectedEq.coords, 5, { duration: 2 });
    }
  }, [selectedEq, map]);
  return null;
}

// Get color based on magnitude
const getColor = (mag) => {
  if (mag <= 3) return "limegreen";
  if (mag <= 5) return "orange";
  return "red";
};

// Create marker icon (highlight if selected)
const createIcon = (mag, isSelected) =>
  L.divIcon({
    className: "custom-marker",
    html: `<div style="
      background: ${isSelected ? "yellow" : getColor(mag)};
      width: ${isSelected ? 20 + mag * 4 : 10 + mag * 3}px;
      height: ${isSelected ? 20 + mag * 4 : 10 + mag * 3}px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 6px rgba(0,0,0,0.4);
      transition: transform 0.2s ease;
    "></div>`,
  });

function MapView({ data, selectedEq }) {
  return (
    <div style={{ position: "relative" }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="leaflet-container"
        worldCopyJump={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {data.map((eq) => (
          <Marker
            key={eq.id}
            position={eq.coords}
            icon={createIcon(eq.mag, selectedEq?.id === eq.id)}
          >
            <Popup>
              <strong style={{ color: getColor(eq.mag) }}>Mag {eq.mag}</strong>
              <br />
              {eq.place}
              <br />
              {new Date(eq.time).toLocaleString()}
            </Popup>
          </Marker>
        ))}

        <FlyTo selectedEq={selectedEq} />
      </MapContainer>

      {/* Floating legend */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          background: document.body.classList.contains("dark-mode")
            ? "rgba(30,30,30,0.85)"
            : "rgba(255,255,255,0.9)",
          color: document.body.classList.contains("dark-mode") ? "#e4e6eb" : "#212529",
          padding: "10px 14px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          fontSize: "14px",
          zIndex: 9999,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ color: "limegreen", fontWeight: "bold" }}>●</span> Low (≤3)
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ color: "orange", fontWeight: "bold" }}>●</span> Medium (≤5)
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ color: "red", fontWeight: "bold" }}>●</span> Strong (&gt;5)
        </div>
      </div>
    </div>
  );
}

export default MapView;
