

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyC-0RVFZN4w2nWaII7jtIJvMaCCCTSrvyw",
    authDomain: "blogs-c011d.firebaseapp.com",
    projectId: "blogs-c011d",
    storageBucket: "blogs-c011d.appspot.com",
    messagingSenderId: "202141076569",
    appId: "1:202141076569:web:223dc9b1f04e9c21f2b548",
    measurementId: "G-DVWDCZ7GGT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);