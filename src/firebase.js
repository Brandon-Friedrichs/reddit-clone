import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: "AIzaSyDH3-hBZz2Mbw_OA7lqs-0YfUytD_Nxj9E",
  authDomain: "reddit-clone-e30c8.firebaseapp.com",
  projectId: "reddit-clone-e30c8",
  storageBucket: "reddit-clone-e30c8.appspot.com",
  messagingSenderId: "317170455937",
  appId: "1:317170455937:web:0b24825fa018daccffc480"
});

export const auth = app.auth();
export const firestore = app.firestore();
export default app;