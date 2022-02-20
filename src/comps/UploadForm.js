import React from "react";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { FloatingLabel, ProgressBar } from "react-bootstrap";
import { projectStorage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import useLoginCheck from "../hooks/useLoginCheck";
import {
  Form,
  Container,
  Button,
  InputGroup,
  FormControl,
  Image,
} from "react-bootstrap";
import NotLoggedIn from "./NotLoggedIn";

const UploadForm = () => {
  const { loggedIn, checking } = useLoginCheck();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("other");
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
        alert(err.message);
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
    try {
      await addDoc(collection(db, "jokers"), joker);
    } catch (err) {
      alert(err.message);
    }

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
    <Container className="text-center">
      {!loggedIn && !checking && <NotLoggedIn />}
      {loggedIn && !checking && (
        <Form onSubmit={handleSubmit}>
          {image && !uploading && (
            <Image rounded className="mt-2 mb-2" width="30%" src={tempUrl} />
          )}
          {uploading && (
            <ProgressBar
              animated
              variant="success"
              label={`${progress}%`}
              className="mt-3"
              now={progress}
            />
          )}
          <Form.Group className="mt-3 mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              className="text-success"
              type="file"
              accept=".jpg,.jpeg,.png,.gif,.tiff"
              onChange={(e) => imageCheck(e)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Name</Form.Label>

            <FloatingLabel
              controlId="floatingName"
              label="Name"
              className="mb-3"
            >
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="text-success"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <FloatingLabel controlId="floatingDesc" label="Description">
              <Form.Control
                className="mb-3 text-success"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                as="textarea"
                placeholder="Description"
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3 text-success">
            <Form.Label>Category</Form.Label>
            <Form.Select
              className="text-success"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option selected disabled>
                Select Category
              </option>
              <option value="pop">Pop</option>
              <option value="figurine">Figurine</option>
              <option value="actionFigure">Action Figure</option>
              <option value="keychain">Keychain</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Label>Price</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text className="text-success">$</InputGroup.Text>
            <FormControl
              className="text-success"
              accept=""
              onChange={(e) => setPrice(parseInt(e.target.value))}
              type="number"
              value={price}
            />
          </InputGroup>

          <Button className="mb-5" variant="success" type="submit">
            Submit
          </Button>
        </Form>
      )}
      {error && <p>{error}</p>}
    </Container>
  );
};

export default UploadForm;
