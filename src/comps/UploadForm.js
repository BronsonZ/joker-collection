import React from "react";
import {
  Form,
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";

const UploadForm = () => {
  return (
    <div>
      <Container className="text-center">
        <Form>

          <Form.Group className="mt-3 mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as='textarea' rows={3} placeholder="Description" />
          </Form.Group>

          <Form.Label>Price</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <FormControl placeholder="Price" />
          </InputGroup>

        </Form>
      </Container>
    </div>
  );
};

export default UploadForm;
