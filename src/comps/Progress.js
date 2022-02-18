import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";
import { ProgressBar } from "react-bootstrap";
import { collection, addDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

const Progress = ({
  image,
  setImage,
  setUploading,
  setImageUrl,
  name,
  desc,
  price,
}) => {
  const { progress, url } = useStorage(image);

  const uploadPost = async (joker) => {
    const docRef = await addDoc(collection(db, "jokers"), joker);
    console.log(docRef.id);
  };

  useEffect(() => {
    if (url) {
      setImageUrl(url);
      setImage(null);

      let joker = { name, desc, price, image: url };

      uploadPost(joker);

      setUploading(false);
    }
  }, [url, setImage]);

  return <ProgressBar now={progress} />;
};

export default Progress;
