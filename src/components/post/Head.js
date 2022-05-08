import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Head({ userId, profileName, fullName }) {
  console.log();
  return (
    <div className="flex justify-between items-center gap-2 p-2 border-b-2 rounded-lg">
      <Link to={`/p/${profileName}`} className={`flex  items-center gap-4`}>
        <div>
          {profileName ? (
            <img
              className="rounded-full w-10"
              src={require(`../../images/avatars/${profileName}.jpg`)}
              alt="user"
            />
          ) : (
            <Skeleton width={"40px"} height={"40px"} circle={true} />
          )}
        </div>
        {
          <h2 className="font-bold">
            {fullName || <Skeleton width={"100px"} />}
          </h2>
        }
      </Link>
      <button>
        <svg
          aria-label="More options"
          className="_8-yf5 "
          color="#262626"
          fill="#262626"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <circle cx="12" cy="12" r="1.5"></circle>
          <circle cx="6" cy="12" r="1.5"></circle>
          <circle cx="18" cy="12" r="1.5"></circle>
        </svg>
      </button>
    </div>
  );
}

export default Head;
