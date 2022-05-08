import React from "react";
import { User } from "./User";

import Suggestion from "./Suggestions/Suggestions";

function SideBar({ name, fullName, id }) {
  // console.log(name);

  return (
    <div className="p-4  col-span-1 flex container">
      <div className="flex flex-col gap-4 w-full">
        <User name={name} fullName={fullName} />
        <h5 className="text-zinc-500 font-medium">{"Suggestions For You"}</h5>
        <Suggestion userId={id} />
      </div>
    </div>
  );
}

export default SideBar;
