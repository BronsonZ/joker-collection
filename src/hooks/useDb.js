import { useEffect, useState } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../firebase/config";

const useDb = (filter) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getData = async (filter) => {

        let q;

        if(filter){
            q = query(collection(db, "jokers"), where("name", "==", filter));
        } else {
            q = query(collection(db, "jokers"));
        }
      

      const querySnapshot = await getDocs(q);

      let docs = [];

      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setPosts(docs);
    };

    getData(filter);
  }, [filter]);

  return { posts };
};

export default useDb;
