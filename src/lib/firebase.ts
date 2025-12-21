// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCiTqLfgXF9crknc_SWuT95nL59Diuglgg",
  authDomain: "biryani-house-e44a3.firebaseapp.com",
  projectId: "biryani-house-e44a3",
  storageBucket: "biryani-house-e44a3.firebasestorage.app",
  messagingSenderId: "664868416192",
  appId: "1:664868416192:web:1105aa3853127a2a695b25"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore & Storage
export const db = getFirestore(app);
export const storage = getStorage(app);

// Optional: Export app if needed elsewhere
export default app;