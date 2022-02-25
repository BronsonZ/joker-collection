import Home from "./comps/Home";
import SinglePost from "./comps/SinglePost";
import Stats from "./comps/Stats";
import UploadForm from "./comps/UploadForm.js";
import NotFound from "./comps/NotFound";
import { Routes, Route } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./comps/LoginPage";
import useLoginCheck from "./hooks/useLoginCheck";

function App() {

  const { loggedIn, checking } = useLoginCheck();

  return (
    <div className="text-success" >
      <Navbar sticky="top" bg="dark" expand="md">
        <Container className="text-end">
        <Navbar.Brand style={{color: "#7554A3", fontSize: "1.5em" }} href="/">Mindi's Jokers!</Navbar.Brand>
        <Navbar.Toggle className="shadow-none" style={{ backgroundColor: "#7554A3"}}/>
        <Navbar.Collapse className="justify-content-end">
          <Nav >
            {!checking  && loggedIn && <Nav.Link style={{color: "#7554A3"}}  href="/upload">Upload</Nav.Link>}
            <Nav.Link style={{color: "#7554A3"}}  href="/login">Account</Nav.Link>
            <Nav.Link style={{color: "#7554A3"}} href="/stats">Stats</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadForm />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/jokers/:id" element={<SinglePost />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      </div>
  );
}

export default App;
