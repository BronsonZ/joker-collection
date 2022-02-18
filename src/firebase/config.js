import * as firebase from "firebase/app";
import 'firebase/storage';
import 'firebase/firestore';

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
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

export { projectStorage, projectFirestore };