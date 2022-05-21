import React from "react";

import Header from "../components/Header";
import Timeline from "../components/Timeline";
import SideBar from "../components/SideBar";

import useUser from "../hooks/useUser";

function Home() {
  const {
    activeUser: { name, fullName, id, following },
  } = useUser();
  return (
    <div className="flex flex-col items-center  bg-[#FAFAFA] dark:bg-slate-900 min-h-screen">
      <Header />
      <div className="grid grid-cols-3 justify-between  gap-2 p-2 container">
        <Timeline
          following={following}
          fullName={fullName}
          currentUserId={id}
          currentUserName={name}
        />
        <SideBar name={name} fullName={fullName} id={id} />
      </div>
    </div>
  );
}

export default Home;
