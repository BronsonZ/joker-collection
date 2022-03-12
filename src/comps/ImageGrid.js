import { AdvancedImage } from "@cloudinary/react";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { RemoveScroll } from "react-remove-scroll";
import { createImageUrl } from "../utils/CloudinaryFunctions";
import SingleImage from "./SingleImage";
import LazyLoad, { forceCheck } from "react-lazyload";

const ImageGrid = ({ posts, folder, title }) => {
  const [showPost, setShowPost] = useState(false);
  const [postId, setPostId] = useState("");
  const handleShow = (id) => {
    if (!showPost) {
      setShowPost(true);
      setPostId(id);
    }
  };
  useEffect(() => {
    forceCheck();
  }, [title]);

  return (
    <>
      <Row xs="2" sm="2" md="3" lg="3" xl="4" xxl="4">
        {posts &&
          posts.map((post) => (
            <Col
              className="text-wrap p-1"
              key={post.id}
            >
              <LazyLoad height={360}>
                <AdvancedImage
                  onClick={() => handleShow(post.id)}
                  style={{
                    objectFit: "cover",
                    height: "360px",
                    width: "100%",
                    cursor: "pointer",
                  }}
                  cldImg={createImageUrl(post.imageId)}
                />
              </LazyLoad>
            </Col>
          ))}
      </Row>
      {showPost && (
        <RemoveScroll allowPinchZoom={true} removeScrollBar={false}>
          <SingleImage folder={folder} id={postId} setShowPost={setShowPost} />
        </RemoveScroll>
      )}
    </>
  );
};

export default ImageGrid;
