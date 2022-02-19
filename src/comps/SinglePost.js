import React from "react";
import { Container, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useSingleDb from "../hooks/useSingleDb";

const SinglePost = () => {
  const { id } = useParams();
  const { post } = useSingleDb(id);
  return (
    <Container className="mt-3 text-center text-wrap">
          <h1>{post.name}</h1>
          <h2 className="mb-0">Description: {post.desc}</h2>
          <h2>Price: ${post.price}</h2>
          <Image className="mb-3" rounded fluid src={post.imageUrl} />
    </Container>
  );
};

export default SinglePost;
