import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";

const useLoginCheck = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);
  const [ user, setUser ] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoggedIn(true);
        setChecking(false);
      } else {
        setUser("");
        setLoggedIn(false);
        setChecking(false);
      }
    });
  }, []);

  return { loggedIn, checking, user };
};

export default useLoginCheck;