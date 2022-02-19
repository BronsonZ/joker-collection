import Home from "./comps/Home";
import SinglePost from "./comps/SinglePost";
import Stats from "./comps/Stats";
import UploadForm from "./comps/UploadForm.js";
import NotFound from "./comps/NotFound";
import { Routes, Route } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsFillPlusCircleFill as PlusCircle } from "react-icons/bs"
import { MdQueryStats as StatsIcon } from "react-icons/md"
import { IoHome } from "react-icons/io5"
import { IconContext } from "react-icons";

function App() {
  return (
    <div className="bg-light min-vh-100" >
      <IconContext.Provider value={{ size: "2em" }}>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
        <Navbar.Brand href="/"><IoHome /></Navbar.Brand>
          <Nav>
            <Nav.Link href="/stats"><StatsIcon/></Nav.Link>
            <Nav.Link  href="/upload"><PlusCircle/></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      </IconContext.Provider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadForm />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/jokers/:id" element={<SinglePost />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
