// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "vingo-food-delivery-dace0.firebaseapp.com",
  projectId: "vingo-food-delivery-dace0",
  storageBucket: "vingo-food-delivery-dace0.firebasestorage.app",
  messagingSenderId: "109966004784",
  appId: "1:109966004784:web:97cd6755b9600369d693f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {app,auth}
