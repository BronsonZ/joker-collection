import React from "react";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { ProgressBar } from "react-bootstrap";
import { projectStorage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import {
  Form,
  Container,
  Button,
  InputGroup,
  FormControl,
  Image,
} from "react-bootstrap";

const UploadForm = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [tempUrl, setTempUrl] = useState("");

  const imageCheck = (e) => {
    let file = e.target.files[0];
    if (file) {
      if (JSON.stringify(file.type).includes("image")) {
        setImage(file);
        setTempUrl(URL.createObjectURL(file));
      } else {
        setImage("");
        e.target.value = null;
        alert("Error: Not an image file");
      }
    }
  };

  const uploadImage = () => {
    const uuid = uuidv4();
    const storageRef = ref(projectStorage, `/images/${uuid}`);
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
          uploadPost(imageUrl, uuid);
        });
      }
    );
  };

  const uploadPost = async (imageUrl, uuid) => {
    let joker;
    if (!price) {
      joker = { name, imageUrl, desc, category, price: 0, uuid };
    } else {
      joker = { name, imageUrl, desc, category, price, uuid };
    }
    await addDoc(collection(db, "jokers"), joker);
    setUploading(false);
    setName("");
    setImage("");
    setTempUrl("");
    setDesc("");
    setPrice("");
    setCategory("");
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
          {image && !uploading && (
            <Image rounded className="mt-2 mb-2" width="30%" src={tempUrl} />
          )}
          {uploading && <ProgressBar className="mt-3" now={progress} />}
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
              rows={2}
              placeholder="Description"
              value={desc}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select onChange={(e) => setCategory(e.target.value)}>
              <option value="" selected disabled>
                Select Category
              </option>
              <option value="pop">Pop</option>
              <option value="actionFigure">Action Figure</option>
            </Form.Select>
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
        {error && <p>{error}</p>}
      </Container>
    </div>
  );
};

export default UploadForm;
