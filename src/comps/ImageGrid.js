import { useEffect, useState } from "react";
import useDb from "../hooks/useDb";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  ButtonGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import useFilter from "../hooks/useFilter";
import LazyLoad from "react-lazyload";
import ScaleLoader from "react-spinners/ScaleLoader";
import useQueryString from "../hooks/useQueryString";

const ImageGrid = () => {
  const [filter, setFilter] = useQueryString("", "");
  const [title, setTitle] = useState("All Jokers");

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

  const { posts: unFiltered } = useDb();
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

      <Row xs="2" sm="2" md="3" lg="4" xl="5" xxl="6">
        {filtered &&
          filtered.map((post) => (
            <Col className="text-wrap p-1" key={post.id}>
              <Link
                className="text-decoration-none text-reset"
                to={`/jokers/${post.id}`}
              >
                <LazyLoad
                  once={true}
                  placeholder={
                    <ScaleLoader
                      height={200}
                      width={10}
                      margin={10}
                      color="#058759"
                    />
                  }
                >
                  <Image rounded src={post.imageUrl} className="w-100" />
                </LazyLoad>
              </Link>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default ImageGrid;
