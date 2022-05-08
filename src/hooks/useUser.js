import { useState, useContext, useEffect } from "react";

import UserContext from "../context/user";
import { getUserById } from "../lib/user";

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const user = useContext(UserContext);

  async function getUser() {
    if (user?.uid) {
      const response = await getUserById(user.uid);
      if (response.exists()) {
        setActiveUser(response.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  }

  useEffect(() => {
    getUser();
  }, [user]);

  return { activeUser };
}
