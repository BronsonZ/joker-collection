import { useContext, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { FloatingLabel } from "react-bootstrap";
import {
  Form,
  Container,
  Button,
  InputGroup,
  FormControl,
  Image,
  Spinner
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { LoginContext } from "../Contexts/LoginContext";

const UploadForm = () => {
  const {checking, loggedIn} = useContext(LoginContext);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("other");
  const [uploading, setUploading] = useState(false);
  const [tempUrl, setTempUrl] = useState("");
  const [wishlist, setWishlist ] = useState(false);

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
    if (image && JSON.stringify(image.type).includes("image")) {
      let preset;
      wishlist ? preset="wishlist" : preset="jokerImages"

    let formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", preset);

    fetch("https://api.cloudinary.com/v1_1/dar0pitop/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          alert("Error uploading image");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        uploadPost(data.public_id);
      })
    } else {
      setImage("");
      setUploading(false);
      alert("Image error, reselect image")
    }
  };

  const uploadPost = async (imageId) => {
    let folder;
    wishlist ? folder="wishlistJokers" : folder="jokers"
    let joker;
    if (!price) {
      joker = { name, imageId, desc, category, price: 0 };
    } else {
      joker = { name, imageId, desc, category, price };
    }
    try {
      await addDoc(collection(db, folder), joker);
    } catch (err) {
      alert(err.message);
    }

    setUploading(false);
    setWishlist(false);
    setName("");
    setImage("");
    setTempUrl("");
    setDesc("");
    setPrice("");
    setCategory("");
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);
    uploadImage();
  };

  return (
    <Container className="text-center">
      { !checking && !loggedIn && (
        <>
        <h1>You are not logged in!</h1>
        <Link className="text-reset" to="/login">Login Page</Link>
        </>
      )}
      { !checking && loggedIn  && (
        <Form onSubmit={handleSubmit}>
          <h1> Upload a new Joker! </h1>
          {image && !uploading && (
            <div>
            <Image rounded className="mt-2 mb-2" style={{maxHeight: "210px"}} src={tempUrl} />
            <p>Selected Image</p>
            </div>
          )}
          {uploading && (
            <>
            <Spinner className="mt-3" animation="border" variant="success" />
            <p className="mb-0">Uploading...</p>
            </>
          )}
          <Form.Group className="mt-4 mb-3">
            <Form.Control
              className="text-success"
              type="file"
              accept=".jpg,.jpeg,.png,.gif,.tiff"
              onChange={(e) => imageCheck(e)}
              required
            />
          </Form.Group>

          <Form.Group>
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
                required
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
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
            <Form.Select
              className="text-success"
              onChange={(e) => setCategory(e.target.value)}
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="pop">Pop</option>
              <option value="figurine">Figurine</option>
              <option value="actionFigure">Action Figure</option>
              <option value="keychain">Keychain</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>

          <InputGroup className="mb-3">
            <InputGroup.Text className="text-success">Cost $</InputGroup.Text>
            <FormControl
              className="text-success"
              accept=""
              onChange={(e) => setPrice(parseInt(e.target.value))}
              type="number"
              value={price}
            />
          </InputGroup>
          <Form.Group >
            <Form.Check className="text-start" name="wishlist" checked={wishlist} label="Wishlist?" onChange={(e)=> setWishlist(e.target.checked)}/>
          </Form.Group>
          <Button className="mb-5" variant="success" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default UploadForm;
