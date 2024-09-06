// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-mf9FFUGw8VOPTNBccsul5B7atvdc6fI",
  authDomain: "aitube-fa857.firebaseapp.com",
  projectId: "aitube-fa857",
  storageBucket: "aitube-fa857.appspot.com",
  messagingSenderId: "971198150855",
  appId: "1:971198150855:web:8ff6a46efc95efe20da6e2",
  measurementId: "G-JTPL478XG4"
};


// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseapp);
export const db = getFirestore(firebaseapp);

