import { AdvancedImage } from "@cloudinary/react"
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { RemoveScroll } from "react-remove-scroll";
import { createImageUrl } from "../utils/CloudinaryFunctions"
import SinglePost from "./SinglePost";
import LazyLoad, { forceCheck } from 'react-lazyload';

const ImageGrid = ({posts, folder, title}) => {
  const [ show, setShow ] = useState(false);
  const [ showId, setShowId] = useState("");
  const handleShow = (id) => {
    if(!show){
      setShow(true)
      setShowId(id)
    }
  }
  useEffect(()=> {
    forceCheck();
  }, [title])

    return (
      <>
        <Row xs="2" sm="2" md="3" lg="3" xl="4" xxl="4">
        {posts &&
          posts.map((post) => (
            <Col className="text-wrap p-1"  key={post.id} onClick={()=>handleShow(post.id)} >
              <LazyLoad height={360} >
              <AdvancedImage style={{objectFit: "cover", height: "360px", width: "100%", cursor: "pointer"}} cldImg={createImageUrl(post.imageId)} />
              </LazyLoad>
            </Col>
          ))}
      </Row>
      {show && <RemoveScroll allowPinchZoom={true} removeScrollBar={false}><SinglePost folder={folder} id={showId} setShow={setShow} /></RemoveScroll> }
      
      </>
    )
}

export default ImageGrid;