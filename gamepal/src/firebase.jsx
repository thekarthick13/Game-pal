// Import the functions you need from the SDKs you need
import React, { Component } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTPwL4HkFZ58bZ1Ssc3TJMLddGNaosEOQ",
  authDomain: "gamepal-54956.firebaseapp.com",
  projectId: "gamepal-54956",
  storageBucket: "gamepal-54956.appspot.com",
  messagingSenderId: "735648187257",
  appId: "1:735648187257:web:7dccb9f0b4b287733525a8",
  measurementId: "G-ED3T98THW6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();