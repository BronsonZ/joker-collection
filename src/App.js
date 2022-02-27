import SinglePost from "./comps/SinglePost";
import Stats from "./comps/Stats";
import UploadForm from "./comps/UploadForm.js";
import NotFound from "./comps/NotFound";
import { Routes, Route } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./comps/LoginPage";
import useLoginCheck from "./hooks/useLoginCheck";
import WishList from "./comps/WishList";
import SingleWishlist from "./comps/SingleWishlist";
import Home from "./comps/Home";

function App() {

  const { loggedIn, checking, user } = useLoginCheck();

  return (
    <div className="text-success" >
      <Navbar style={{backgroundColor: "rgba(33, 37, 41, 0.90)"}} fixed="top" expand="md">
        <Container className="text-end">
        <Navbar.Brand style={{color: "#7554A3", fontSize: "1.5em" }} href="/">Mindi's Jokers!</Navbar.Brand>
        <Navbar.Toggle className="shadow-none" style={{ backgroundColor: "#7554A3"}}/>
        <Navbar.Collapse style={{fontSize: "1.2em"}} className="p-1 justify-content-end">
          <Nav >
            {!checking  && loggedIn && <Nav.Link style={{color: "#7554A3"}} href="/upload">Upload</Nav.Link>}
            <Nav.Link style={{color: "#7554A3"}}  href="/login">Account</Nav.Link>
            <Nav.Link style={{color: "#7554A3"}}  href="/stats">Stats</Nav.Link>
            <Nav.Link style={{color: "#7554A3"}}  href="/wishlist">Wishlist</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadForm loggedIn={loggedIn} checking={checking}/>} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/jokers/:id" element={<SinglePost loggedIn={loggedIn} checking={checking} />} />
        <Route path="/wishlist/:id" element={<SingleWishlist loggedIn={loggedIn} checking={checking} />} />
        <Route path="/login" element={<LoginPage loggedIn={loggedIn} checking={checking} user={user} />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      </div>
  );
}

export default App;
