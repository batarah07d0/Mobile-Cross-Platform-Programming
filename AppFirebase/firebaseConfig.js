// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA1HBxcJjqkxyJvgWT4lN8NXdxVJ9in52M",
  authDomain: "app-firebase-e4e27.firebaseapp.com",
  projectId: "app-firebase-e4e27",
  storageBucket: "app-firebase-e4e27.firebasestorage.app",
  messagingSenderId: "594914547561",
  appId: "1:594914547561:web:2bd9fff569cc3e07bdcff8",
  measurementId: "G-71D1HBC9T7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export app as default and others as named exports
export { analytics, db, storage };
export default app;
