import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbZL5bQIYq72FbFgAXlo5o5P1_b5UaYiw",
  authDomain: "my-insta-clone-9d08c.firebaseapp.com",
  projectId: "my-insta-clone-9d08c",
  storageBucket: "my-insta-clone-9d08c.appspot.com",
  messagingSenderId: "547749922260",
  appId: "1:547749922260:web:e9e60b6bf16fc1b2fec241",
  measurementId: "G-KLTZ8JWNJ0",
};
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const firestoreDB = getFirestore(app);




export default app;
