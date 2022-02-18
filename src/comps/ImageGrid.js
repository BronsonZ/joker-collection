import React from "react";
import useDb from "../hooks/useDb";
import { Container, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ImageGrid = () => {
  const { posts } = useDb();
  return (
    <Container className="mt-3" fluid="sm">
      <Row xs={2} sm={2} md={3} lg={4}>
        {posts &&
          posts.map((post) => (
            <Col key={post.id}>
              <h3>{post.name}</h3>
              <Image width="80%" rounded fluid src={post.imageUrl} />
              <p>Description:{post.desc} Price: {post.price}</p>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default ImageGrid;
