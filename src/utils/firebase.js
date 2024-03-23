// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_Bmw9CMzj4QAXg5mKOMLVtLYl8dzmLAk",
  authDomain: "netflix-gpt-2cbb8.firebaseapp.com",
  projectId: "netflix-gpt-2cbb8",
  storageBucket: "netflix-gpt-2cbb8.appspot.com",
  messagingSenderId: "704294376057",
  appId: "1:704294376057:web:fcb3be1a22b3c2d5c1faa8",
  measurementId: "G-MRPVENHG2Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
