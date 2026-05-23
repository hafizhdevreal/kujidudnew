// lib/firebase.js

import { initializeApp } from "firebase/app";

import {
  getAuth,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey:
    "AIzaSyD8H-U9USjcRyYE0WOY7wtm0mdZhGNj7DI",

  authDomain:
    "kujidudshop.firebaseapp.com",

  projectId:
    "kujidudshop",

  storageBucket:
    "kujidudshop.firebasestorage.app",

  messagingSenderId:
    "1096111335856",

  appId:
    "1:1096111335856:web:b68671693002bca0680e75",

  measurementId:
    "G-YE9BJ0MYQF",
};

const app =
  initializeApp(firebaseConfig);

export const auth =
  getAuth(app);

export const db =
  getFirestore(app);

export default app;
