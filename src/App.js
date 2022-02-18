import Home from "./comps/Home";
import UploadForm from "./comps/UploadForm.js";
import { Routes, Route } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Navbar bg="light" sticky="top">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/stats">Stats</Nav.Link>
            <Nav.Link href="/upload">Upload</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="upload" element={<UploadForm />} />
      </Routes>
    </div>
  );
}

export default App;
