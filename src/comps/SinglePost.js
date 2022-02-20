import React, { useState } from "react";
import { Container, Image, Button, Row, Col, Modal } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import useSingleDb from "../hooks/useSingleDb";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { getStorage, ref, deleteObject } from "firebase/storage";
import useLoginCheck from "../hooks/useLoginCheck";

const SinglePost = () => {
  const { loggedIn, checking } = useLoginCheck();
  const navigate = useNavigate();
  const { id } = useParams();
  const { post } = useSingleDb(id);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleDelete = async () => {
    await deleteDoc(doc(db, "jokers", id));
    const storage = getStorage();
    const desertRef = ref(storage, `/images/${post.uuid}`);

    deleteObject(desertRef)
      .then(() => {
        console.log("delete image successful");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };
  return (
    <>
      <Container className="mt-3 text-center text-wrap overflow-auto">
        <h1>{post.name}</h1>
        <h3 className="mb-0">{post.desc}</h3>
        <h3>Cost: ${post.price}</h3>
        <Image className="mb-3" fluid rounded src={post.imageUrl} />
        <Row className="mb-5 mt-3">
          <Col>
            {!checking && loggedIn && <Button className="shadow-none mb-5" variant="success" onClick={() => setShow(true)}>Delete Joker</Button>}
          </Col>
        </Row>
      </Container>

      <Modal className="text-center" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the joker baby "{post.name}"?</Modal.Body>
        <Modal.Footer>
          <Button className="shadow-none" variant="danger" onClick={handleDelete}>
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
