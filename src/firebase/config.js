import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"
import {initializeAuth, indexedDBLocalPersistence, browserLocalPersistence, browserSessionPersistence} from "firebase/auth"




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARz4vNoYt-B_ohrYInPiaRUehocurpLWo",
  authDomain: "joker-collection-17d8c.firebaseapp.com",
  projectId: "joker-collection-17d8c",
  storageBucket: "joker-collection-17d8c.appspot.com",
  messagingSenderId: "115018187362",
  appId: "1:115018187362:web:cb2a88eb7bc1bb845a473b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: [
     indexedDBLocalPersistence,
     browserLocalPersistence,
     browserSessionPersistence
   ],
 });

export const projectStorage = getStorage(app);

export const db = getFirestore(app);