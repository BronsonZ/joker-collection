import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSingleDb from "../hooks/useSingleDb";
import SingleImage from "./SingleImage";
import { DeleteDoc } from "../utils/FirestoreFunctions";

const SingleWishlist = ({loggedIn, checking}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { post } = useSingleDb(id, "wishlistJokers");
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    await DeleteDoc("wishlistJokers", id);

    setDeleting(false);
    navigate("/");
  };
  return (
    <SingleImage
      post={post}
      handleDelete={handleDelete}
      loggedIn={loggedIn}
      checking={checking}
      deleting={deleting}
      setDeleting={setDeleting}
      navigate={navigate}
    />
  );
};

export default SingleWishlist;
