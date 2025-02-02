import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYdOyxap1nv5bFCedoRfwSEeuLlHh8a6Q",
  authDomain: "todo-app-b9f6a.firebaseapp.com",
  projectId: "todo-app-b9f6a",
  storageBucket: "todo-app-b9f6a.firebasestorage.app",
  messagingSenderId: "490455494775",
  appId: "1:490455494775:web:fff82d8e8774c374c25672",
  measurementId: "G-7GK2V8XVT9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };