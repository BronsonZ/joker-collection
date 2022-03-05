import { AdvancedImage } from "@cloudinary/react";
import { useState } from "react";
import { Button, Container, Modal, Spinner } from "react-bootstrap";
import { createSingleImageUrl } from "../utils/CloudinaryFunctions";



const SingleImage = ({post, handleDelete, loggedIn, checking, deleting, setDeleting, setShowImage, allowScroll}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    return (
        <>
      <Container style={{width: "100%", height: "100%"}} className="mt-3 text-center text-wrap overflow-auto">
      <Button
          variant="success"
          className="mb-3 mx-3"
          onClick={() => {
            setShowImage(false)
            allowScroll();
          }}
        >
          Close
        </Button>
            {!checking && loggedIn && (
              <Button
                className="shadow-none mb-3 px-3"
                variant="success"
                onClick={() => setShow(true)}
              >
                Delete Joker
              </Button>
            )}
        <h1>{post.name}</h1>
        <h3 className="mb-1">{post.desc}</h3>
        {post.price > 0 && <h3>Cost: ${post.price}</h3>}
        
        <AdvancedImage className="mb-3 mt-2" style={{ maxHeight: "70%" ,  maxWidth: "100%"}} cldImg={createSingleImageUrl(post.imageId)} />
          
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
    )
}

export default SingleImage;