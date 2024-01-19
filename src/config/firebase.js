import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDBdSwENWxqyzLtdRex_hz5uGB0wGWQSJc",
    authDomain: "first-firebase-5ff5b.firebaseapp.com",
    projectId: "first-firebase-5ff5b",
    storageBucket: "first-firebase-5ff5b.appspot.com",
    messagingSenderId: "94577229033",
    appId: "1:94577229033:web:98efe407a85e5971e50478",
    measurementId: "G-96KD026LDE",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
