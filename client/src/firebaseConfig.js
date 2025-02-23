// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore Database
import { getAuth } from "firebase/auth"; // Authentication
import { getStorage } from "firebase/storage"; // Storage

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq7aikYT9PW3FG3Uf8-tf8gTVLpWhanHg",
  authDomain: "disaster-relief-project.firebaseapp.com",
  databaseURL: "https://disaster-relief-project-default-rtdb.firebaseio.com",
  projectId: "disaster-relief-project",
  storageBucket: "disaster-relief-project.appspot.com",
  messagingSenderId: "120208437609",
  appId: "1:120208437609:web:0f20b79c0432cebe990df8",
  measurementId: "G-12TK6NHLQY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Log a message to confirm Firebase initialization
console.log("🔥 Firebase initialized successfully");

// Export Firebase services
export { app, db, auth, storage };
