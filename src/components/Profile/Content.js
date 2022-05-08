import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { getProfileInfoByName } from "../../lib/user";
import ProfilePhotos from "./PhotosContainer";

function Content({ displayName }) {
  const [profile, setProfile] = useState();

  //Change window title
  useEffect(() => {
    if (profile?.fullName) document.title = profile.fullName;
  }, [profile]);

  //Get profile data from api
  useEffect(() => {
    getProfileInfoByName(displayName).then((data) => {
      setProfile(data);
      console.log("profile ", data);
    });
  }, [displayName]);

  return (
    <>
      <section className="w-fit grid grid-cols-5 grid-rows-3 gap-4 py-8 text-lg ">
        <div className="col-span-2 row-span-3 flex justify-center">
          {!displayName ? (
            <Skeleton circle width={"64px"} height={"64px"} />
          ) : (
            <img
              className="rounded-full w-36 h-36"
              src={require(`../../images/avatars/${displayName}.jpg`)}
              alt="user"
            />
          )}
        </div>
        <h1 className="col-span-3 row-span-1 flex items-center text-3xl">
          {displayName}
        </h1>
        {profile ? (
          <>
            <h2>
              <strong>{0}</strong> {" posts"}
            </h2>
            <h2>
              <strong>{profile.followers}</strong>
              {" followers"}
            </h2>
            <h2>
              <strong>{profile.following}</strong> {" following"}
            </h2>
            <h3 className="col-span-3 font-medium">{profile.fullName}</h3>
          </>
        ) : (
          <div className="col-span-3 row-span-2">
            <Skeleton />
            <Skeleton />
          </div>
        )}
      </section>
      <hr className="w-3/4" />
      <ProfilePhotos profileId={profile?.profileId} />
    </>
  );
}

export default Content;
