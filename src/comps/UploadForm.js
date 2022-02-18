import React from "react";
import { useState } from "react";
import Progress from "./Progress";
import { collection, addDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
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
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const imageCheck = (e) => {
    let file = e.target.files[0];
    if (file) {
      if (JSON.stringify(file.type).includes("image")) {
        setImage(file);
      } else {
        setImage("");
        e.target.value = null;
        alert("Error: Not an image file");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };


  return (
    <div>
      <Container className="text-center">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mt-3 mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept=".jpg,.jpeg,.png,.gif,.tiff"
              onChange={(e) => imageCheck(e)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
              value={name}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              placeholder="Description"
              value={desc}
            />
          </Form.Group>

          <Form.Label>Price</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <FormControl
              placeholder="Price"
              accept=""
              onChange={(e) => setPrice(e.target.value)}
              type="number"
            />
          </InputGroup>

          <Button
            className="mb-3"
            variant="dark"
            type="submit"
            onClick={() => setUploading(true)}
          >
            Submit
          </Button>
        </Form>
        {uploading && (
          <Progress
            image={image}
            name={name}
            desc={desc}
            price={price}
            setImage={setImage}
            setImageUrl={setImageUrl}
            setUploading={setUploading}
          />
        )}
      </Container>
    </div>
  );
};

export default UploadForm;
