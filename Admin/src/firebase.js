// const VITE_FIREBASE_APP_API_KEY = import.meta.env.VITE_APP_FIREBASE_API_KEY;
// const VITE_FIREBASE_APP_AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_APP_AUTH_DOMAIN;
// const VITE_FIREBASE_APP_PROJECT_ID = import.meta.env.VITE_FIREBASE_APP_PROJECT_ID;
// const VITE_FIREBASE_APP_STORAGE_BUCKET = import.meta.env.VITE_FIREBASE_APP_STORAGE_BUCKET;
// const VITE_FIREBASE_APP_MESSAGING_SENDER_ID = import.meta.env.VITE_FIREBASE_APP_MESSAGING_SENDER_ID;
// const VITE_FIREBASE_APP_APP_ID = import.meta.env.VITE_FIREBASE_APP_APP_ID;
// VITE_FIREBASE_APP_AUTH_DOMAIN = "ecommerce-55742.firebaseapp.com",
//   VITE_FIREBASE_APP_PROJECT_ID = "ecommerce-55742",
//   VITE_FIREBASE_APP_STORAGE_BUCKET = "ecommerce-55742.firebasestorage.app",
//   VITE_FIREBASE_APP_MESSAGING_SENDER_ID = "725960228606",
//   VITE_FIREBASE_APP_APP_ID = "1:725960228606:web:e2d486041f6eda2c00efaf",

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // apiKey: VITE_FIREBASE_APP_API_KEY,
  apiKey: "AIzaSyAyfob5xEc2NsWmFi5aHWrWWAeniNiZ37w",
  authDomain: "ecommerce-55742.firebaseapp.com",
  projectId: "ecommerce-55742",
  storageBucket: "ecommerce-55742.firebasestorage.app",
  messagingSenderId: "725960228606",
  appId: "1:725960228606:web:e2d486041f6eda2c00efaf"
};

export const firebaseApp = initializeApp(firebaseConfig);