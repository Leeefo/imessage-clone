// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
// import firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyArte5E5-TG2eYT5K39YfL5mNTNCUfrgc8",
    authDomain: "imessage-clone-975ac.firebaseapp.com",
    projectId: "imessage-clone-975ac",
    storageBucket: "imessage-clone-975ac.appspot.com",
    messagingSenderId: "509096087257",
    appId: "1:509096087257:web:6081e500896935a4d3b8c8",
    measurementId: "G-0VZVZ6YL56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// npm install -g firebase-tools

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };