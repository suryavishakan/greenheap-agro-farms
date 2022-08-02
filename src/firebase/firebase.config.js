// imports
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDP2r2uCjxfaM8eCs0Nwbh2lx3nNWY0WDw",
  authDomain: "greenheap-agro-farms.firebaseapp.com",
  projectId: "greenheap-agro-farms",
  storageBucket: "greenheap-agro-farms.appspot.com",
  messagingSenderId: "462454752246",
  appId: "1:462454752246:web:0301dcb76bf684d94fbdd7",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore();
