import React, { useEffect, useState } from "react";
import { getSuggestionsProfiles } from "../../lib/user";
import SuggestedProfile from "./SuggestedProfile";

import { User } from "../User";

export default function Suggestion({ userId }) {
  // function getSuggestionsProfiles(userId) {}

  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    if (userId) {
      getSuggestionsProfiles(userId)
        .then((data) => {
          setProfiles(data);
        })
        .catch((err) => {
          console.log("error while get suggested profiles", err);
        });
    }
  }, [userId]);
  return (
    <div className="flex flex-col gap-8 w-100">
      {profiles.map((profile) => (
        <SuggestedProfile
          key={profile.id}
          profileId={profile.id}
          userId={userId}
          profileName={profile.name}
        />
      ))}
    </div>
  );
}
