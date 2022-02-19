import React, { useState } from "react";
import { Container, Image, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import useSingleDb from "../hooks/useSingleDb";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { getStorage, ref, deleteObject } from "firebase/storage";

const SinglePost = () => {
  const  navigate  = useNavigate();
  const { id } = useParams();
  const { post } = useSingleDb(id);
  const [pressedDelete, setPressedDelete] = useState(false);

  const deletePost = async () => {
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
    <Container className="mt-3 text-center text-wrap">
      <h1>{post.name}</h1>
      <h2 className="mb-0">Description: {post.desc}</h2>
      <h2>Price: ${post.price}</h2>
      <Image className="mb-3" rounded fluid src={post.imageUrl} />
      {!pressedDelete && (
        <Row>
          <Col>
            <Button
              className="mb-3 mt-3"
              onClick={() => setPressedDelete(true)}
            >
              Delete Joker
            </Button>
          </Col>
        </Row>
      )}
      {pressedDelete && (
        <Row>
          <h3>Are you sure?</h3>
          <Col>
            <Button className="mb-3 w-75" onClick={() => {
                deletePost();
                }}>
              Yes
            </Button>
          </Col>
          <Col>
            <Button
              className="mb-3 w-75"
              onClick={() => setPressedDelete(false)}
            >
              No
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default SinglePost;
