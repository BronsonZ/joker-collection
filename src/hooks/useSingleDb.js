import { useEffect, useState } from "react";
import { collection, doc, getDoc, where } from "firebase/firestore";
import { db } from "../firebase/config";

const useSingleDb = (id) => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const getData = async (id) => {
        const docRef = doc(db, "jokers", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            setPost(docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      
    };

    getData(id);
  }, [id]);

  return { post };
};

export default useSingleDb;
