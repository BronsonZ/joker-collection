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
            setFilter(""); }}>
          All
        </ToggleButton>
        <ToggleButton
          className="shadow-none"
          variant="outline-dark"
          id="pop"
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
          id="actionFigure"
          value={3}
          onClick={() => {
            setFilter("actionFigure");
          }}
        >
          Action Figures
        </ToggleButton>
      </ToggleButtonGroup>
      <Row className="" xs="2" sm="2" md="3" lg="4" xl="4" xxl="5">
        {posts &&
          posts.map((post) => (
            <Col className="text-wrap" key={post.id}>
              <Link
                className="text-decoration-none text-reset"
                to={`/jokers/${post.id}`}
              >
                <h3 className="mb-1">{post.name}</h3>
                {post.desc && <p className="mb-1">{post.desc}</p>}
                <Image className="mb-2 mt-0" fluid rounded src={post.imageUrl} />
              </Link>
            </Col>
          ))}
      </Row>
      </Container>
  );
};

export default ImageGrid;