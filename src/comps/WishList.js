import useDb from "../hooks/useDb";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LazyLoad from "react-lazyload";
import ScaleLoader from "react-spinners/ScaleLoader";

const WishList = () => {
  const { posts } = useDb(false, "wishlistJokers");
  return (
    <Container className="mt-3 text-center">
      <h1>Wishlist</h1>

      <Row xs="2" sm="2" md="3" lg="4" xl="5" xxl="6">
        {posts &&
          posts.map((post) => (
            <Col className="text-wrap p-1" key={post.id}>
              <Link
                className="text-decoration-none text-reset"
                to={`/wishlist/${post.id}`}
              >
                <LazyLoad
                  once={true}
                  placeholder={
                    <ScaleLoader
                      height={200}
                      width={10}
                      margin={10}
                      color="#058759"
                    />
                  }
                >
                  <Image rounded src={post.imageUrl} className="w-100" />
                </LazyLoad>
              </Link>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default WishList;
