import { useEffect, useState } from "react";
import { doc, getDoc, } from "firebase/firestore";
import { db } from "../firebase/config";

const useSingleDb = (id, folder) => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const abort = new AbortController();
    const getData = async (id) => {
        const docRef = doc(db, folder, id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            setPost(docSnap.data());
        } else {
          console.log("No such document!");
        }     
    };
    getData(id);
    return () => {
      abort.abort()
    }
  }, [id, folder]);

  return { post };
};

export default useSingleDb;
