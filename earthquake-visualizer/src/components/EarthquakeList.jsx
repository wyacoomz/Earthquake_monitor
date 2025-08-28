import { ListGroup } from "react-bootstrap";

function EarthquakeList({ data, onSelect }) {
  return (
    <div className="earthquake-list">
      <ListGroup>
        {data.map((eq) => (
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
