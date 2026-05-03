import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCBx2lDHlWqE66kwIhDVdHxhXbwarjnIos",
  authDomain: "aadhyaraj-technologies-1555c.firebaseapp.com",
  projectId: "aadhyaraj-technologies-1555c",
  storageBucket: "aadhyaraj-technologies-1555c.firebasestorage.app",
  messagingSenderId: "298550222368",
  appId: "1:298550222368:web:c56def793f01d62dffa645"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();