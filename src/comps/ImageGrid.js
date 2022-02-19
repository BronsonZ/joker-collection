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
    <Container className="mt-3 text-center">
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
            setFilter("pop");
          }}
        >
          Pops
        </ToggleButton>
        <ToggleButton
          className="shadow-none"
          variant="outline-dark"
          id="cooper"
          value={3}
          onClick={() => {
            setFilter("actionFigure");
          }}
        >
          Action Figures
        </ToggleButton>
      </ToggleButtonGroup>
      <Row xs={2} sm={2} md={3} lg={4}>
        {posts &&
          posts.map((post) => (
            <Col className="text-wrap bg-light border" key={post.id}>
              <Link
                className="text-decoration-none text-reset"
                to={`/${post.id}`}
              >
                <h3 className="mb-1">{post.name}</h3>
                <Image fluid rounded src={post.imageUrl} />
                {post.desc && <p className="mb-1">Description: {post.desc}</p>}
              </Link>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default ImageGrid;
