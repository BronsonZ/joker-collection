import { useState, useEffect } from "react";
import { projectStorage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = ref(projectStorage, `/images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        setError(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => setUrl(url))
      }
    );

  }, [file]);

  return { progress, url, error };
};

export default useStorage;