import useDb from "../hooks/useDb";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Cloudinary} from "@cloudinary/url-gen";
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { dpr } from "@cloudinary/url-gen/actions/delivery";

const WishList = () => {
  const { posts } = useDb(false, "wishlistJokers");

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dar0pitop'
    }
  });

  const createImageUrl = (id) => {
  
    const myImage = cld.image(id);

    myImage
    .quality('auto')
    .format('webp')
    .resize(fill().width(500).height(700).gravity(autoGravity()))
    .delivery(dpr('auto'))

    return myImage;
  }

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
                <AdvancedImage style={{objectFit: "cover", height: "350px", width: "100%"}} cldImg={createImageUrl(post.imageId)} plugins={[lazyload(), placeholder({mode: 'blur'})]}/>
              </Link>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default WishList;
