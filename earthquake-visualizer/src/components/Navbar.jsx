import { Navbar as BsNavbar, Container, Form } from "react-bootstrap";

function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <BsNavbar bg="dark" variant="dark">
      <Container>
        <BsNavbar.Brand>🌍 Earthquake Visualizer</BsNavbar.Brand>
        <Form.Check
          type="switch"
          id="dark-mode-switch"
          label={darkMode ? "Dark" : "Light"}
          checked={darkMode}
          onChange={toggleDarkMode}
        />
      </Container>
    </BsNavbar>
  );
}

export default Navbar;
