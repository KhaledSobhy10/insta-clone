import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function User({ name, fullName }) {
  // console.log("name ", name);
  // console.log("fullname ", fullName);
  return (
    <Link
      to={`/p/${name}`}
      className={`flex  items-center gap-4 dark:text-white`}
    >
      <div className="">
        {!name ? (
          <Skeleton circle width={"64px"} height={"64px"} />
        ) : (
          <img
            className="rounded-full w-16"
            src={require(`../images/avatars/${name}.jpg`)}
            alt="user"
          />
        )}
      </div>
      <div className="flex flex-col w-fit">
        {<h2 className="font-bold">{name || <Skeleton />}</h2>}
        {
          <h4 className="text-sm ">
            {fullName || <Skeleton width={"64px"} />}
          </h4>
        }
      </div>
    </Link>
  );
}
