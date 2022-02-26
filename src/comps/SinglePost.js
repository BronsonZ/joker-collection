import { useState } from "react";
import { Container, Button, Row, Col, Modal, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import useSingleDb from "../hooks/useSingleDb";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import useLoginCheck from "../hooks/useLoginCheck";
import {Cloudinary} from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';


const SinglePost = () => {
  const { loggedIn, checking } = useLoginCheck();
  const navigate = useNavigate();
  const { id } = useParams();
  const { post } = useSingleDb(id, "jokers");
  const [show, setShow] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dar0pitop'
    }
  });

  const createImageUrl = (id) => {
  
    const myImage = cld.image(id);

    myImage
    .quality('auto')
    .format('webp')

    return myImage;
  }

  const handleClose = () => setShow(false);

  const handleDelete = async () => {
    await deleteDoc(doc(db, "jokers", id));

    setDeleting(false);
    navigate("/");
  };
  return (
    <>
      <Container className="mt-3 text-center text-wrap overflow-auto">
        <Button
          variant="success"
          className="mb-3"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </Button>
        <h1>{post.name}</h1>
        <h3 className="mb-1">{post.desc}</h3>
        {post.price > 0 && <h3>Cost: ${post.price}</h3>}
        <AdvancedImage className="mb-3 mt-2" style={{ maxHeight: "850px" }} cldImg={createImageUrl(post.imageId)} />
        <Row className="mb-5 mt-3">
          <Col>
            {!checking && loggedIn && (
              <Button
                className="shadow-none mb-5"
                variant="success"
                onClick={() => setShow(true)}
              >
                Delete Joker
              </Button>
            )}
          </Col>
        </Row>
      </Container>

      <Modal className="text-center" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        {!deleting && (
          <Modal.Body>
            Are you sure you want to delete the joker baby "{post.name}"?
          </Modal.Body>
        )}
        {deleting && (
          <Modal.Body>
            <Spinner className="mt-3" animation="border" />
            <p className="mb-0">Deleting...</p>
          </Modal.Body>
        )}

        <Modal.Footer>
          <Button
            className="shadow-none"
            variant="danger"
            onClick={() => {
              setDeleting(true);
              handleDelete();
            }}
          >
            Yes
          </Button>
          <Button className="shadow-none" variant="dark" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SinglePost;
