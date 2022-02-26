import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {initializeAuth, indexedDBLocalPersistence, browserLocalPersistence, browserSessionPersistence} from "firebase/auth"
const { initializeAppCheck, ReCaptchaV3Provider } = require("firebase/app-check");



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

export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LcQI54eAAAAACrR0QOk2imk4ZXfXGAApbAAdksc'),
  isTokenAutoRefreshEnabled: true
});

export const auth = initializeAuth(app, {
  persistence: [
     indexedDBLocalPersistence,
     browserLocalPersistence,
     browserSessionPersistence
   ],
 });

export const db = getFirestore(app);