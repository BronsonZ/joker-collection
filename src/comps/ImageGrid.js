import { AdvancedImage, lazyload } from "@cloudinary/react"
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useScrollBlock } from "../hooks/useScrollBlock";
import { createImageUrl } from "../utils/CloudinaryFunctions"
import SinglePost from "./SinglePost";

const ImageGrid = ({posts, loggedIn, checking, folder}) => {
  const [ show, setShow ] = useState(false);
  const [ showId, setShowId] = useState("");
  const [blockScroll, allowScroll] = useScrollBlock();
  const handleShow = (id) => {
    if(!show){
      setShow(true)
      setShowId(id)
      blockScroll();
    }
  }
    return (
      <>
        <Row xs="2" sm="2" md="3" lg="3" xl="4" xxl="4">
        {posts &&
          posts.map((post) => (
            <Col className="text-wrap p-1" key={post.id} onClick={()=>handleShow(post.id)} >
                <AdvancedImage style={{objectFit: "cover", height: "300px", width: "100%"}} cldImg={createImageUrl(post.imageId)} plugins={[lazyload()]}/>
            </Col>
          ))}
      </Row>
      {show && <div className="centered">
      <SinglePost folder={folder} loggedIn={loggedIn} checking={checking} allowScroll={allowScroll}  id={showId} setShow={setShow} />
      </div>}
      
      </>
    )
}

export default ImageGrid;