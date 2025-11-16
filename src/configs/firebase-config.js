// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1vlk6wiDmpkQP5J2WHjNgAxzy2BgNjXY",
  authDomain: "smarttrip-2acf2.firebaseapp.com",
  projectId: "smarttrip-2acf2",
  storageBucket: "smarttrip-2acf2.firebasestorage.app",
  messagingSenderId: "708851833387",
  appId: "1:708851833387:web:019eafa8f2a44d5d6da86e",
  measurementId: "G-6SEFMX8T8V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);

