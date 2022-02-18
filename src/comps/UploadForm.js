import React from "react";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { ProgressBar } from "react-bootstrap";
import { projectStorage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  Form,
  Container,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";

const UploadForm = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

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

  const uploadImage = () => {
    const storageRef = ref(projectStorage, `/images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        setError(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((imageUrl) => {
          uploadPost(imageUrl);
        });
      }
    );
  };

  const uploadPost = async (imageUrl) => {
    let joker;
    if (!price) {
      joker = { name, imageUrl, desc, price: 0 };
    } else {
      joker = { name, imageUrl, desc, price };
    }
    await addDoc(collection(db, "jokers"), joker);
    setUploading(false);
    setName("");
    setImage("");
    setDesc("");
    setPrice("");
    setProgress(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);
    uploadImage();
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
              value={name}
              required
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
              onChange={(e) => setPrice(parseInt(e.target.value))}
              type="number"
              value={price}
            />
          </InputGroup>

          <Button className="mb-3" variant="dark" type="submit">
            Submit
          </Button>
        </Form>
        {uploading && <ProgressBar now={progress} />}
        {error && <p>{error}</p>}
      </Container>
    </div>
  );
};

export default UploadForm;
