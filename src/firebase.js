import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlCYSI1BXvRHzeJRrQ3VUrXMoNWRfI5go",
  authDomain: "todo-app-0821.firebaseapp.com",
  projectId: "todo-app-0821",
  storageBucket: "todo-app-0821.firebasestorage.app",
  messagingSenderId: "52434485736",
  appId: "1:52434485736:web:4717c04b9f943419a8245d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

