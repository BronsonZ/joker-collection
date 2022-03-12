import useSingleDb from "../hooks/useSingleDb";
import { DeleteDoc } from "../utils/FirestoreFunctions";
import { AdvancedImage } from "@cloudinary/react";
import { useContext, useState } from "react";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import { createSingleImageUrl } from "../utils/CloudinaryFunctions";
import { LoginContext } from "../Contexts/LoginContext";

const SingleImage = ({ id, setShowPost, folder }) => {
  const { post } = useSingleDb(id, folder);
  const [deleting, setDeleting] = useState(false);
  const [doneDeleting, setDoneDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { checking, loggedIn } = useContext(LoginContext);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleDelete = async () => {
    await DeleteDoc(folder, id);
    setDeleting(false);
    setDoneDeleting(true);
    await sleep(1000);
    window.location.reload();
  };

  return (
    <>
      <Container fluid className="text-center text-wrap overflow-auto centered">
        <Row style={{ paddingTop: "5em" }}>
          <Col>
            <Button
              variant="success"
              className="mb-1 mx-3"
              onClick={() => {
                setShowPost(false);
              }}
            >
              Close
            </Button>
            {!checking && loggedIn && (
              <Button
                className="shadow-none mb-1 px-3"
                variant="danger"
                onClick={() => setShowModal(true)}
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

      <Modal
        className="text-center"
        centered
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        {!deleting && !doneDeleting && (
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
        {doneDeleting && (
          <Modal.Body>Successfully deleted "{post.name}"!</Modal.Body>
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
          <Button
            className="shadow-none"
            variant="dark"
            onClick={() => setShowModal(false)}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SingleImage;
