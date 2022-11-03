// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBYj2E2CcvFNkgMBTpEEMhSceG4xFCpvR0",
  authDomain: "polyworksupport.firebaseapp.com",
  databaseURL: "https://polyworksupport-default-rtdb.firebaseio.com",
  projectId: "polyworksupport",
  storageBucket: "polyworksupport.appspot.com",
  messagingSenderId: "768413371818",
  appId: "1:768413371818:web:8952f86917be7df74f2fd3",
  measurementId: "G-GB6BYR3MMJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getDatabase(app);
// export default firebaseConfig;
