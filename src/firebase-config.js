import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8r7QWL_tM998r38OUzMwlPwSI2g_sQS4",
  authDomain: "blogspark-61d03.firebaseapp.com",
  projectId: "blogspark-61d03",
  storageBucket: "blogspark-61d03.appspot.com",
  messagingSenderId: "367657436000",
  appId: "1:367657436000:web:d86f6a0ff40aa8748b1405",
  measurementId: "G-Y6JJEE6J87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();