// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "netflixgpt-57508.firebaseapp.com",
  projectId: "netflixgpt-57508",
  storageBucket: "netflixgpt-57508.appspot.com",
  messagingSenderId: "202634380659",
  appId: "1:202634380659:web:c886498b1afd4a3e6db106",
  measurementId: "G-NCNLEM2GSN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
export default auth;
