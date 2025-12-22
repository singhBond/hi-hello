// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJThL6rN2L7rZuSgy_JX69h3KStiBzrVQ",
  authDomain: "hi-hello-ad3e2.firebaseapp.com",
  projectId: "hi-hello-ad3e2",
  storageBucket: "hi-hello-ad3e2.firebasestorage.app",
  messagingSenderId: "179385329546",
  appId: "1:179385329546:web:98a814f32d872894a4ca73"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore & Storage
export const db = getFirestore(app);
export const storage = getStorage(app);

// Optional: Export app if needed elsewhere
export default app;