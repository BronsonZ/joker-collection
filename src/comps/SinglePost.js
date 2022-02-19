import React from "react";
import { useParams } from "react-router-dom";
import useSingleDb from "../hooks/useSingleDb";

const SinglePost = () => {
    const { id } = useParams();
    const { post } = useSingleDb(id);
    return(
        <div>
        <h1>{post.name}</h1>
        <h1>{post.desc}</h1>
        <h1>{post.price}</h1>
        <img src={post.imageUrl}/>
        </div>
    )
}

export default SinglePost;