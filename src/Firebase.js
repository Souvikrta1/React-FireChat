import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyChoT1gV3IVLpfSUwSBP6ugkesvW3pTOV0",
    authDomain: "react-chat-1b858.firebaseapp.com",
    projectId: "react-chat-1b858",
    storageBucket: "react-chat-1b858.appspot.com",
    messagingSenderId: "120712852073",
    appId: "1:120712852073:web:8230e1b8f5811596c468f8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore()
export const auth = getAuth(app);