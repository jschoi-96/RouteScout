// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALxgOuYaCc2yEkL6e_x4V7s9JUCLRJBKs",
  authDomain: "routescout-1ac17.firebaseapp.com",
  projectId: "routescout-1ac17",
  storageBucket: "routescout-1ac17.appspot.com",
  messagingSenderId: "1037457527694",
  appId: "1:1037457527694:web:58137593c7663eacaf8adf",
  measurementId: "G-FW226KECCQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initalize components
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();