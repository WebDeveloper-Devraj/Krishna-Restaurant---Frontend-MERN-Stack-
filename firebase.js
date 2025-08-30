// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvFeqcZmCE94VVFdtmAutRrIEPtq-uXCo",
  authDomain: "restaurant-app-110512.firebaseapp.com",
  projectId: "restaurant-app-110512",
  storageBucket: "restaurant-app-110512.firebasestorage.app",
  messagingSenderId: "795914471365",
  appId: "1:795914471365:web:998cfb9b21b7cc93e2adac",
  measurementId: "G-N0WYYD8YBG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export
const auth = getAuth(app);

// Google provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export { auth, googleProvider };
