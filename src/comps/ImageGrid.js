import { AdvancedImage, lazyload } from "@cloudinary/react"
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { createImageUrl } from "../utils/CloudinaryFunctions"

const ImageGrid = ({posts, folder}) => {
    return (
        <Row xs="2" sm="2" md="3" lg="3" xl="4" xxl="4">
        {posts &&
          posts.map((post) => (
            <Col className="text-wrap p-1" key={post.id}>
              <Link
                className="text-decoration-none text-reset"
                to={`/${folder}/${post.id}`}
              >
                <AdvancedImage style={{objectFit: "cover", height: "300px", width: "100%"}} cldImg={createImageUrl(post.imageId)} plugins={[lazyload()]}/>
              </Link>
            </Col>
          ))}
      </Row>
    )
}

export default ImageGrid;