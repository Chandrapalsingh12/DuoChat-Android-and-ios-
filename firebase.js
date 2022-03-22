// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { initializeFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtGDvmi3zNqu5bU5frN-5jbBZANDXeEHs",
    authDomain: "chatapp-41343.firebaseapp.com",
    projectId: "chatapp-41343",
    storageBucket: "chatapp-41343.appspot.com",
    messagingSenderId: "258833634670",
    appId: "1:258833634670:web:3bc7ccf1ed732eaf719d7f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app)
export const db = initializeFirestore(app, { experimentalForceLongPolling: true })


export function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}
export function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
}

