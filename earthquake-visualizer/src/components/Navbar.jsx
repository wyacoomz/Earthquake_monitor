import { Navbar as BsNavbar, Container, Form } from "react-bootstrap";

function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <BsNavbar
      bg={darkMode ? "dark" : "light"}   // dynamic background
      variant={darkMode ? "dark" : "light"} // dynamic text color
      className="mb-3"
    >
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
