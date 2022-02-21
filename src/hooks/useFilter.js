import { useEffect, useState } from "react";

const useFilter = (posts, filter) => {
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    const abort = new AbortController();
    setFiltered(posts.filter((post) => post.category.includes(filter)));
    return () => {
        abort.abort()
      }
  }, [posts, filter]);

  return { filtered };
};

export default useFilter;
