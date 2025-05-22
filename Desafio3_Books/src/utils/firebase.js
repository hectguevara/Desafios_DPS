// src/utils/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAdw2MXM32w7NyX9Qic6PyrpU2-rNLXqQA",
  authDomain: "booktracker-9017f.firebaseapp.com",
  projectId: "booktracker-9017f",
  storageBucket: "booktracker-9017f.firebasestorage.app",
  messagingSenderId: "895248939789",
  appId: "1:895248939789:web:aba4bd6ec5c0d872b28e44"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };