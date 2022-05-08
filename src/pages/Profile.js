import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import useUser from "../hooks/useUser";
import Footer from "../components/Footer";
import ProfileContent from "../components/Profile/Content";

function Profile() {
  const {
    activeUser: { name, fullName, id, following },
  } = useUser();

  const { displayName } = useParams();

  return (
    <div className="flex flex-col justify-center items-center bg-[#FAFAFA] min-h-screen">
      <Header />
      <main className="container flex flex-col items-center flex-1">
        <ProfileContent displayName={displayName} />
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
