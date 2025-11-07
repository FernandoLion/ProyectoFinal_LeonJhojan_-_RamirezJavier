import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB0ZSOgZi7MVjMEpwZxku_M14ewB1vHEys",
  authDomain: "cms-noticias-9efec.firebaseapp.com",
  projectId: "cms-noticias-9efec",
  storageBucket: "cms-noticias-9efec.firebasestorage.app",
  messagingSenderId: "238369845451",
  appId: "1:238369845451:web:8ab7bb4cababdcdc91eb4e",
  measurementId: "G-SL5MP60QSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exportar los servicios que vamos a usar (Auth, Firestore, Storage)
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);