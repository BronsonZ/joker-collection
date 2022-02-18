import React from "react";
import useDb from "../hooks/useDb";
import { Container, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ImageGrid = () => {
  const { posts } = useDb();
  return (
    <Container  className="mt-3" fluid="sm">
      <Row xs={2} sm={2} md={3} lg={4}>
        {posts &&
          posts.map((post) => (
            <Col style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}} key={post.id}>
              <h3>{post.name}</h3>
              <Image width="80%" rounded fluid src={post.imageUrl} />
              <p className="mb-0">Description: {post.desc}</p>
              <p>Price: {post.price}</p>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default ImageGrid;
