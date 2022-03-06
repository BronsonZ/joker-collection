import { useState } from "react";
import useDb from "../hooks/useDb";
import {
  Container,
  ButtonGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import useFilter from "../hooks/useFilter";
import useQueryString from "../hooks/useQueryString";
import { useTitle } from "../hooks/useTitle";
import ImageGrid from "./ImageGrid";


const Home = () => {
  const [filter, setFilter] = useQueryString("", "");
  const [title, setTitle] = useState("All Jokers");
  
  useTitle(filter, setTitle);

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
      <ImageGrid posts={filtered} folder="jokers" />
    </Container>
  );
};

export default Home;
