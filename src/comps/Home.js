import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Alert,
  Breadcrumb,
  Dropdown,
  ButtonGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const Home = () => {
  return (
    <div className="home">
      <Container>
        <Row>
          <h1 className="justify-content-center text-center">Mindi's Joker Collection</h1>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
