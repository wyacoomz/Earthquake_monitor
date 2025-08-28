import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import GlobeView from "./components/GlobeView";
import EarthquakeList from "./components/EarthquakeList";
import { Container, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import "./App.css";

function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedEq, setSelectedEq] = useState(null);
  const [viewMode, setViewMode] = useState("map"); // "map" or "globe"

  useEffect(() => {
    fetch(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    )
      .then((res) => res.json())
      .then((data) => {
        const features = data.features.map((f) => ({
          id: f.id,
          place: f.properties.place,
          mag: f.properties.mag,
          time: f.properties.time,
          coords: [f.geometry.coordinates[1], f.geometry.coordinates[0]],
        }));
        setEarthquakes(features);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Toggle body class for dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <Container fluid className="mt-3">
        {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && (
          <Row>
            {/* Left list */}
            <Col md={4}>
              <h5 className="mb-3">Recent Earthquakes</h5>
              <EarthquakeList data={earthquakes} onSelect={setSelectedEq} />
            </Col>

            {/* Right map/globe */}
            <Col md={8}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5>Visualization</h5>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    setViewMode((prev) => (prev === "map" ? "globe" : "map"))
                  }
                >
                  Switch to {viewMode === "map" ? "🌐 Globe" : "🗺 Map"}
                </Button>
              </div>

              {viewMode === "map" ? (
                <MapView data={earthquakes} selectedEq={selectedEq} />
              ) : (
                <GlobeView data={earthquakes} selectedEq={selectedEq} />
              )}
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default App;
