// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDhalDL4xlwai2yTYvTxfYTSb9ZJVBvvjw",
    authDomain: "re-react-disney-plus-app.firebaseapp.com",
    projectId: "re-react-disney-plus-app",
    storageBucket: "re-react-disney-plus-app.appspot.com",
    messagingSenderId: "53993884752",
    appId: "1:53993884752:web:33dd81d96f8d8b38e69555"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;