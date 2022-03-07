import { AdvancedImage } from "@cloudinary/react";
import { useContext, useState } from "react";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import { createSingleImageUrl } from "../utils/CloudinaryFunctions";
import { LoginContext } from "../Contexts/LoginContext";

const SingleImage = ({
  post,
  handleDelete,
  deleting,
  setDeleting,
  setShowImage,
}) => {
  const [show, setShow] = useState(false);
  const { checking, loggedIn } = useContext(LoginContext);

  const handleClose = () => setShow(false);
  return (
    <>
      <Container fluid className="text-center text-wrap overflow-auto centered">
        <Row style={{paddingTop: "5em"}}>
          <Col>
          <Button
          variant="success"
          className="mb-1 mx-3"
          onClick={() => {
            setShowImage(false);

          }}
        >
          Close
        </Button>
        {!checking && loggedIn && (
          <Button
            className="shadow-none mb-1 px-3"
            variant="danger"
            onClick={() => setShow(true)}
          >
            Delete Joker
          </Button>
        )}
        <h2 className="mb-1">{post.name}</h2>
        <h4 className="mb-0">{post.desc}</h4>
        {post.price > 0 && <h3 className="mb-1">Cost: ${post.price}</h3>}

          </Col>
        </Row>
        
        
        <AdvancedImage
          style={{ maxHeight: "70vh", maxWidth: "100%" }}
          cldImg={createSingleImageUrl(post.imageId)}
        />
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

export default SingleImage;
