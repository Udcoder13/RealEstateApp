// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-mern-711ee.firebaseapp.com",
  projectId: "real-estate-mern-711ee",
  storageBucket: "real-estate-mern-711ee.appspot.com",
  messagingSenderId: "880371151450",
  appId: "1:880371151450:web:3c48a4d21acd744dfdde63"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);