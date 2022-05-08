import { useState, useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import FirebaseContext from "../context/firebase";

export default function useAuthListener() {
  const [user, setUser] = useState(getUser());
  const app = useContext(FirebaseContext);

  function getUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  useEffect(() => {
    const listener = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        // User is signed in
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      } else {
        // User is signed out
        localStorage.removeItem("user");
        setUser(null);
      }
    });

    return () => {
      listener();
    };
  }, [app]);

  console.log("custom hook auth listener ");
  return { user };
}
