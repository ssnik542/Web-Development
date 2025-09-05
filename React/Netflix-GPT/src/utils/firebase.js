// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCGsurKuVRwEnc7agWgCAtns9mpVNjTUR0",
    authDomain: "netflixgpt-ad92f.firebaseapp.com",
    projectId: "netflixgpt-ad92f",
    storageBucket: "netflixgpt-ad92f.appspot.com",
    messagingSenderId: "97042182791",
    appId: "1:97042182791:web:ffde58eb741f7c2b90be22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
