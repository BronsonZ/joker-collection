import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const useDb = () => {
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    const q = query(collection(db, "jokers"));

    const querySnapshot = await getDocs(q);

    let docs = [];

    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setPosts(docs);
  }, []);

  return { posts };
};

export default useDb;
