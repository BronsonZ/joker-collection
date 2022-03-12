import Stats from "./comps/Stats";
import UploadForm from "./comps/UploadForm.js";
import NotFound from "./comps/NotFound";
import { Routes, Route } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./comps/LoginPage";
import useLoginCheck from "./hooks/useLoginCheck";
import WishList from "./comps/WishList";
import Home from "./comps/Home";
import About from "./comps/About";
import {LoginContext} from "./Contexts/LoginContext"


function App() {

  const { loggedIn, checking, user } = useLoginCheck();

  return (
    <div className="text-success" >
      <Navbar style={{backgroundColor: "rgba(33, 37, 41, 0.90)"}} fixed="top" expand="lg">
        <Container className="text-end">
        <Navbar.Brand className="navhome" style={{color: "#7554A3", fontSize: "1.5em" }} href="/">Mindi's Jokers!</Navbar.Brand>
        <Navbar.Toggle className="navbarBtn shadow-none" style={{ backgroundColor: "#7554A3"}}/>
        <Navbar.Collapse style={{fontSize: "1.2em"}} className="p-1 justify-content-end">
          <Nav >
            {!checking  && loggedIn && <Nav.Link className="navlink" style={{color: "#7554A3"}} href="/upload">Upload</Nav.Link>}
            <Nav.Link className="navlink" style={{color: "#7554A3"}}  href="/login">Account</Nav.Link>
            <Nav.Link className="navlink" style={{color: "#7554A3"}}  href="/stats">Stats</Nav.Link>
            <Nav.Link className="navlink" style={{color: "#7554A3"}}  href="/wishlist">Wishlist</Nav.Link>
            <Nav.Link className="navlink" style={{color: "#7554A3"}}  href="/about">About</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginContext.Provider value={{loggedIn, checking, user}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      </LoginContext.Provider>
      </div>
  );
}

export default App;
