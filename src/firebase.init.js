// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRCbLaf5H6u0U1wWEDO0wZTl4WjO8qzTI",
    authDomain: "to-do-app-c9ca2.firebaseapp.com",
    projectId: "to-do-app-c9ca2",
    storageBucket: "to-do-app-c9ca2.appspot.com",
    messagingSenderId: "451569179303",
    appId: "1:451569179303:web:f9a3e20c4f2414958b5982"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;