import React, { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { follow } from "../../lib/user";

export default function SuggestedProfile({ profileId, profileName, userId }) {
  const [isFollowed, setIsFollowed] = useState(false);
  return (
    <>
      {!isFollowed && (
        <div className="flex justify-between gap-4 dark:text-white">
          <Link to={`/p/${profileName}`} className={`flex  items-center gap-4`}>
            <div className="">
              {!profileName ? (
                <Skeleton circle width={"40px"} height={"40px"} />
              ) : (
                <img
                  className="rounded-full w-10"
                  src={require(`../../images/avatars/${profileName}.jpg`)}
                  alt="user"
                />
              )}
            </div>
            {
              <h2 className="font-bold">
                {profileName || <Skeleton width={"64px"} />}
              </h2>
            }
          </Link>
          <button
            className="text-sky-500 hover:text-sky-600 cursor-pointer text-sm font-bold"
            onClick={(e) => {
              e.target.disabled = true;
              setIsFollowed(true);
              follow(userId, profileId)
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                  e.target.disabled = false;
                });
            }}
          >
            Follow
          </button>
        </div>
      )}
    </>
  );
}
