// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwzFrbNdLt_r-vdT-HP1pVqrpzyJBvYwU",
  authDomain: "systemsolar-app.firebaseapp.com",
  projectId: "systemsolar-app",
  storageBucket: "systemsolar-app.appspot.com",
  messagingSenderId: "67023889283",
  appId: "1:67023889283:web:9664a7987271b8e2614cb6",
  measurementId: "G-5W7MC04NYL"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };