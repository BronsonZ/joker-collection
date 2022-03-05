import { useState } from "react";
import useSingleDb from "../hooks/useSingleDb";
import SingleImage from "./SingleImage";
import { DeleteDoc } from "../utils/FirestoreFunctions";

const SinglePost = ({  id, setShow, loggedIn, checking, allowScroll, folder }) => {
  const { post } = useSingleDb(id, folder);
  const [deleting, setDeleting] = useState(false);
  

  const handleDelete = async () => {
    await DeleteDoc(folder, id);

    setDeleting(false);
  };
  return (
    <SingleImage
      post={post}
      handleDelete={handleDelete}
      loggedIn={loggedIn}
      checking={checking}
      deleting={deleting}
      setDeleting={setDeleting}
      setShowImage={setShow}
      allowScroll={allowScroll}
    />
  );
};

export default SinglePost;
