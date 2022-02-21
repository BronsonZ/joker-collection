import { useEffect, useState } from "react";

const useFilter = (posts, filter) => {
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    setFiltered(posts.filter((post) => post.category.includes(filter)));
  }, [posts, filter]);

  return { filtered };
};

export default useFilter;
