import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyANk729tPcwJBINH7HDLKoPzhaRx1HaQg0",
    authDomain: "hasuraxfirebase.firebaseapp.com",
    projectId: "hasuraxfirebase",
    storageBucket: "hasuraxfirebase.firebasestorage.app",
    messagingSenderId: "675482710672",
    appId: "1:675482710672:web:2f92a44ccd7ec4a05c9e15",
    measurementId: "G-N52CJ3FVR3"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { auth };
