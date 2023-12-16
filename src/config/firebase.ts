
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'

import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD0kVOoJAKFbXRpW05X_Hdx4xSnQ3SemDQ",
  authDomain: "streak-4f148.firebaseapp.com",
  projectId: "streak-4f148",
  storageBucket: "streak-4f148.appspot.com",
  messagingSenderId: "654707129438",
  appId: "1:654707129438:web:c62037a8bcfaf7925e48cf",
  measurementId: "G-3R8BSKPP3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)
