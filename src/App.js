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
import { IconContext } from "react-icons";
import { IoPersonAdd } from "react-icons/io5"
import LoginPage from "./comps/LoginPage";
import useLoginCheck from "./hooks/useLoginCheck";

function App() {

  const { loggedIn, checking } = useLoginCheck();

  return (
    <div className="bg-light min-vh-100" >
      <IconContext.Provider value={{ size: "1.5em" }}>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
        <Navbar.Brand href="/">Mindi's Joker Collection!</Navbar.Brand>
          <Nav>
            {!checking  && loggedIn && <Nav.Link  href="/upload"><PlusCircle/></Nav.Link>}
            <Nav.Link  href="/login"><IoPersonAdd/></Nav.Link>
            <Nav.Link href="/stats"><StatsIcon/></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      </IconContext.Provider>

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
