import { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";

function GlobeView({ data, selectedEq }) {
  const globeRef = useRef();
  const [rotationEnabled, setRotationEnabled] = useState(true);

  // Initialize auto-rotation
  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.2;
    }
  }, []);

  // Fly to selected earthquake and stop rotation
  useEffect(() => {
    if (selectedEq && globeRef.current) {
      const { coords } = selectedEq;
      const controls = globeRef.current.controls();
      controls.autoRotate = false; // stop rotation when selected
      setRotationEnabled(false);

      globeRef.current.pointOfView(
        { lat: coords[0], lng: coords[1], altitude: 0.3 },
        2000
      );
    }
  }, [selectedEq]);

  return (
    <div style={{ position: "relative", width: "100%", height: "80vh" }}>
      {/* Globe */}
      <Globe
        ref={globeRef}
        width={window.innerWidth * 0.8}
        height={600}
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
        specularImageUrl="https://unpkg.com/three-globe/example/img/earth-specular.gif"
        backgroundImageUrl="https://unpkg.com/three-globe/example/img/night-sky.png"
        ambientLightIntensity={1}
        directionalLightColor="white"
        directionalLightIntensity={0.8}
        autoRotate={rotationEnabled}          
        autoRotateSpeed={0.2}

        pointsData={data}
        pointLat={d => d.coords[0]}
        pointLng={d => d.coords[1]}
        pointAltitude={d =>
          selectedEq && selectedEq.id === d.id ? 0.05 + d.mag * 0.05 : d.mag * 0.02
        }
        pointRadius={d =>
          selectedEq && selectedEq.id === d.id ? 0.5 + d.mag * 0.2 : 0.3 + d.mag * 0.1
        }
        pointColor={d =>
          selectedEq && selectedEq.id === d.id
            ? "yellow"
            : d.mag <= 3
            ? "limegreen"
            : d.mag <= 5
            ? "orange"
            : "red"
        }
        pointLabel={d => `
          <div style="font-size:14px">
            <b>${d.place}</b><br/>
             Magnitude: ${d.mag}<br/>
             ${new Date(d.time).toLocaleString()}
          </div>
        `}
      />

      {/* Floating color legend */}
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
          pointerEvents: "none",
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

export default GlobeView;
