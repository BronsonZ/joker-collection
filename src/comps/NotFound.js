import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container"

const NotFound = () => {
  return (
    <Container className="text-center" fluid>
      <h1 className="mt-5 mb-2">404 Nothing here :(</h1>
      <Link to="/">Home</Link>
    </Container>
  );
};

export default NotFound;