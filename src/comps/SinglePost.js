import React from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useSingleDb from "../hooks/useSingleDb";

const SinglePost = () => {
  const { id } = useParams();
  const { post } = useSingleDb(id);
  return (
    <Container className="mt-3 text-center">
      <Row>
        <Col className="text-wrap" key={post.id}>
            <h3>{post.name}</h3>
            <Image href="" width="100%" rounded fluid src={post.imageUrl} />
            <p className="mb-0">Description: {post.desc}</p>
            <p>Price: ${post.price}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default SinglePost;
