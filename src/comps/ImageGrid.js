import React, { useState } from "react";
import useDb from "../hooks/useDb";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  ButtonGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ImageGrid = () => {
  const [filter, setFilter] = useState("");
  const [title, setTitle] = useState("All Jokers");

  const { posts } = useDb(filter);
  return (
    <Container className="mt-3 text-center">
      <h1>{title}</h1>
      <ButtonGroup  className="mb-3">
        <DropdownButton
          as={ButtonGroup}
          title="Filter"
          id="bg-nested-dropdown"
          variant="success"
        >
          <Dropdown.Item
          className="text-success"
            eventKey="1"
            onClick={() => {
              setTitle("All Jokers");
              setFilter("");
            }}
          >
            All
          </Dropdown.Item>
          <Dropdown.Item
          className="text-success"
            eventKey="2"
            onClick={() => {
              setTitle("Pops");
              setFilter("pop");
            }}
          >
            Pops
          </Dropdown.Item>
          <Dropdown.Item
          className="text-success"
            eventKey="3"
            onClick={() => {
              setTitle("Figurines");
              setFilter("figurine");
            }}
          >
            Figurines
          </Dropdown.Item>
          <Dropdown.Item
          className="text-success"
            eventKey="4"
            onClick={() => {
              setTitle("Action Figures");
              setFilter("actionFigure");
            }}
          >
            Action Figures
          </Dropdown.Item>
          <Dropdown.Item
          className="text-success"
            eventKey="5"
            onClick={() => {
              setTitle("Keychains");
              setFilter("keychain");
            }}
          >
            Keychains
          </Dropdown.Item>
          <Dropdown.Item
          className="text-success"
            eventKey="6"
            onClick={() => {
              setTitle("Others");
              setFilter("other");
            }}
          >
            Other
          </Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>

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
                <Image
                  className="mb-2 mt-0"
                  fluid
                  rounded
                  src={post.imageUrl}
                />
              </Link>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default ImageGrid;
