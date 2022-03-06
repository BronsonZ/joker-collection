import useDb from "../hooks/useDb";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageGrid from "./ImageGrid";

const WishList = () => {
  const { posts } = useDb(false, "wishlistJokers");

  return (
    <Container className="mt-3 text-center">
      <h1>Wishlist</h1>
      <ImageGrid posts={posts} folder="wishlistJokers"/>
    </Container>
  );
};

export default WishList;
