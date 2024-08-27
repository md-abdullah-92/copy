// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6Ofrh9dXMjNvmI7LNOSsDuztWHpUFix8",
  authDomain: "imageuploadingagribazaar.firebaseapp.com",
  projectId: "imageuploadingagribazaar",
  storageBucket: "imageuploadingagribazaar.appspot.com",
  messagingSenderId: "590608022631",
  appId: "1:590608022631:web:41b64f2094812bd60de8c2",
  measurementId: "G-X1WPBGNKBL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get a reference to the storage service
const storage = getStorage(app);

export { storage };