import { useEffect, useState } from "react";
import useDb from "../hooks/useDb";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import useFilter from "../hooks/useFilter";
import useQueryString from "../hooks/useQueryString";
import {Cloudinary} from "@cloudinary/url-gen";
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { fill } from "@cloudinary/url-gen/actions/resize";
import { dpr } from "@cloudinary/url-gen/actions/delivery";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

const ImageGrid = () => {
  const [filter, setFilter] = useQueryString("", "");
  const [title, setTitle] = useState("All Jokers");

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
    .resize(fill().width(500).height(700).gravity(autoGravity()))
    .delivery(dpr('auto'))

    return myImage;
  }
  

  useEffect(()=>{
    switch(filter){
      case "pop":
        setTitle("Pops")
        break;
      case "actionFigure":
        setTitle("Action  Figures")
        break;
      case "figurine":
        setTitle("Figurines")
        break;
      case "keychain":
        setTitle("Keychains")
        break;
      case "other":
        setTitle("Others")
        break;
      default:
        setTitle("All Jokers")
        break;
    }
  }, [filter])

  const { posts: unFiltered } = useDb(false, "jokers");
  const { filtered } = useFilter(unFiltered, filter);
  return (
    <Container className="mt-3 text-center">
      <h1>{title}</h1>
      <ButtonGroup className="mb-3">
        <DropdownButton
          as={ButtonGroup}
          title="Filter"
          id="bg-nested-dropdown"
          variant="success"
        >
          <Dropdown.Item
            className="text-success"
            eventKey=""
            onClick={() => {
              setFilter("");
            }}
          >
            All
          </Dropdown.Item>
          <Dropdown.Item
            className="text-success"
            eventKey="pop"
            onClick={() => {
              setFilter("pop");
            }}
          >
            Pops
          </Dropdown.Item>
          <Dropdown.Item
            className="text-success"
            eventKey="figurine"
            onClick={() => {
              setFilter("figurine");
            }}
          >
            Figurines
          </Dropdown.Item>
          <Dropdown.Item
            className="text-success"
            eventKey="actionFigure"
            onClick={() => {
              setFilter("actionFigure");
            }}
          >
            Action Figures
          </Dropdown.Item>
          <Dropdown.Item
            className="text-success"
            eventKey="keychain"
            onClick={() => {
              setFilter("keychain");
            }}
          >
            Keychains
          </Dropdown.Item>
          <Dropdown.Item
            className="text-success"
            eventKey="other"
            onClick={() => {
              setFilter("other");
            }}
          >
            Other
          </Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>

      <Row xs="2" sm="2" md="3" lg="3" xl="4" xxl="4">
        {filtered &&
          filtered.map((post) => (
            <Col className="text-wrap p-1" key={post.id}>
              <Link
                className="text-decoration-none text-reset"
                to={`/jokers/${post.id}`}
              >
                <AdvancedImage style={{objectFit: "cover", height: "300px", width: "100%"}} cldImg={createImageUrl(post.imageId)} plugins={[lazyload(), placeholder({mode: 'blur'})]}/>
              </Link>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default ImageGrid;
