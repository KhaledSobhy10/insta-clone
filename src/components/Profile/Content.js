import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { follow, unFollow, getProfileInfoByName } from "../../lib/user";
import ProfilePhotos from "./PhotosContainer";
import useUser from "../../hooks/useUser";

function Content({ displayName }) {
  const [profile, setProfile] = useState();
  const {
    activeUser: { name, fullName, id, following, followers },
  } = useUser();

  const [totalPosts, setTotalPosts] = useState(0);

  const UN_FOLLOW = 0;
  const FOLLOW = 1;
  const USER_PROFILE = 2;

  const [buttonState, setButtonState] = useState();

  function handleFollow(e) {
    console.log("follow clicked");
    follow(id, profile.id).then(() => {
      setButtonState(UN_FOLLOW);
      console.log("follow him now");
    });
  }

  function handleUnFollow(e) {
    console.log("un follow clicked");
    unFollow(id, profile.id).then(() => {
      setButtonState(FOLLOW);
      console.log("no follow more");
    });
  }

  function checkRelBetweenActiveUserAndProfile() {
    // profile.id == id user open his profile
    if (profile.id === id) {
      // console.log("current user show his profile");
      setButtonState(USER_PROFILE);
    } else if (following.includes(profile.id)) {
      // check if user follow profile or not
      // console.log("iam follow him");
      setButtonState(UN_FOLLOW);
    } else {
      // console.log("not follow him");
      setButtonState(FOLLOW);
    }
  }

  //Change window title
  useEffect(() => {
    if (profile?.fullName) {
      document.title = profile.fullName;
      checkRelBetweenActiveUserAndProfile();
    }
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
      <section className="w-fit grid lg:grid-cols-5 lg:grid-rows-3 gap-4 py-8 text-lg">
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
        <h1 className="col-span-2 row-span-1 flex items-center text-3xl ">
          {displayName}
        </h1>
        {buttonState === UN_FOLLOW && (
          <button
            className={`col-span-1 rounded bg-red-500 text-white font-bold text-sm  p-2 `}
            onClick={handleUnFollow}
          >
            Unfollow
          </button>
        )}
        {buttonState === FOLLOW && (
          <button
            className={`col-span-1 rounded bg-sky-500 text-white font-bold text-sm  p-2 `}
            onClick={handleFollow}
          >
            Follow
          </button>
        )}
        {buttonState === USER_PROFILE && (
          <button
            className={`col-span-1 rounded bg-green-500 text-white font-bold text-sm  p-2 `}
          >
            Edit profile
          </button>
        )}

        {profile ? (
          <>
            <h2>
              <strong>{totalPosts}</strong> {" posts"}
            </h2>
            <h2>
              <strong>{profile.followers.length}</strong>
              {" followers"}
            </h2>
            <h2>
              <strong>{profile.following.length}</strong> {" following"}
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
      <ProfilePhotos profileId={profile?.id} setTotalPosts={setTotalPosts} />
    </>
  );
}

export default Content;
