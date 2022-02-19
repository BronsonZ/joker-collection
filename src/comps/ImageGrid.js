import React, { useState } from "react";
import useDb from "../hooks/useDb";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ImageGrid = () => {
  const [filter, setFilter] = useState("");
  const { posts } = useDb(filter);
  return (
    <Container className="mt-3">
      <ToggleButtonGroup
        name="filter-buttons"
        defaultValue={1}
        className="mb-3"
      >
        <ToggleButton
          className="shadow-none"
          variant="outline-dark"
          id="all"
          value={1}
          onClick={() => {
            setFilter("");
          }}
        >
          All
        </ToggleButton>
        <ToggleButton
          className="shadow-none"
          variant="outline-dark"
          id="bronson"
          value={2}
          onClick={() => {
            setFilter("Bronson");
          }}
        >
          Bronson
        </ToggleButton>
        <ToggleButton
          className="shadow-none"
          variant="outline-dark"
          id="cooper"
          value={3}
          onClick={() => {
            setFilter("Cooper");
          }}
        >
          Cooper
        </ToggleButton>
        <ToggleButton
          className="shadow-none"
          variant="outline-dark"
          id="mindi"
          value={4}
          onClick={() => {
            setFilter("Mindi");
          }}
        >
          Mindi
        </ToggleButton>
      </ToggleButtonGroup>
      <Row xs={2} sm={2} md={3} lg={4}>
        {posts &&
          posts.map((post) => (
            <Col className="text-wrap" key={post.id}>
              <Link className="text-decoration-none text-reset" to={`/${post.id}`}>
                <h3>{post.name}</h3>
                <Image href="" width="80%" rounded fluid src={post.imageUrl} />
                <p className="mb-0">Description: {post.desc}</p>
                <p>Price: {post.price}</p>
              </Link>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default ImageGrid;
