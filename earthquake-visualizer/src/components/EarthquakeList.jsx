import { useState } from "react";
import { ListGroup, Row, Col } from "react-bootstrap";

function EarthquakeList({ data, onSelect }) {
  const [sortBy, setSortBy] = useState(null);
  const [ascending, setAscending] = useState(true);

  const handleSort = (field) => {
    if (sortBy === field) {
      setAscending(!ascending);
    } else {
      setSortBy(field);
      setAscending(true);
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortBy) return 0;

    if (sortBy === "magnitude") {
      return ascending ? a.mag - b.mag : b.mag - a.mag;
    } else if (sortBy === "place") {
      return ascending
        ? a.place.localeCompare(b.place)
        : b.place.localeCompare(a.place);
    }
    return 0;
  });

  const headerClass = (field) => `earthquake-header ${sortBy === field ? "active" : ""}`;

  return (
    <div className="earthquake-list">
      <Row className="mb-2">
        <Col>
          <span
            className={headerClass("place")}
            onClick={() => handleSort("place")}
          >
            Place {sortBy === "place" ? (ascending ? "▲" : "▼") : ""}
          </span>
          <span
            className={headerClass("magnitude")}
            onClick={() => handleSort("magnitude")}
          >
            Magnitude {sortBy === "magnitude" ? (ascending ? "▲" : "▼") : ""}
          </span>
        </Col>
      </Row>

      <ListGroup>
        {sortedData.map((eq) => (
          <ListGroup.Item
            key={eq.id}
            action
            onClick={() => onSelect(eq)}
            className="earthquake-item"
          >
            <strong>{eq.mag}</strong> — {eq.place}
            <br />
            <small>{new Date(eq.time).toLocaleString()}</small>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default EarthquakeList;
