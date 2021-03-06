import { useEffect, useState } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../firebase/config";

const useDb = (filter, folder) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abort = new AbortController();
    const getData = async (filter) => {
        setLoading(true);

        let q;

        if(filter){
            q = query(collection(db, folder), where("category", "==", filter));
        } else {
            q = query(collection(db, folder));
        }
      

      const querySnapshot = await getDocs(q);

      let docs = [];

      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setPosts(docs);
      setLoading(false);
    };
    getData(filter);
    return () => {
      abort.abort()
    }
  }, [filter, folder]);

  return { loading, posts };
};

export default useDb;
