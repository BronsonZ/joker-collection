import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

const useLoginCheck = (badSite) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);
  const [ user, setUser ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const abort = new AbortController();
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoggedIn(true);
        setChecking(false);
      } else {
        setUser("");
        setLoggedIn(false);
        setChecking(false);
        if(badSite){
          navigate("/login")
        }
      }
    });
    return () => {
      abort.abort()
    }
  }, [navigate, badSite]);

  return { loggedIn, checking, user };
};

export default useLoginCheck;