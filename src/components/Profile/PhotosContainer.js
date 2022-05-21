import React, { useState, useEffect } from "react";
import { getPostsOfUser } from "../../lib/posts";
import Photo from "./Photo";

function PhotosContainer({ profileId, setTotalPosts }) {
  const [photos, setPhotos] = useState();
  // console.log(profileId);

  useEffect(() => {
    if (profileId) {
      getPostsOfUser(profileId).then((data) => {
        setPhotos(data);
        setTotalPosts(data?.length);
        // console.log(data);
      });
    }
  }, [profileId]);

  return (
    <section className="p-4  h-full flex flex-col items-center">
      <div className="flex items-center gap-2 text-sm font-medium p-4">
        <svg
          aria-label=""
          color="dark:text-white text-[#262626]"
          fill="dark:text-white text-[#262626]"
          height="12"
          role="img"
          viewBox="0 0 24 24"
          width="12"
        >
          <rect
            fill="none"
            height="18"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            width="18"
            x="3"
            y="3"
          ></rect>
          <line
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="9.015"
            x2="9.015"
            y1="3"
            y2="21"
          ></line>
          <line
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="14.985"
            x2="14.985"
            y1="3"
            y2="21"
          ></line>
          <line
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="21"
            x2="3"
            y1="9.015"
            y2="9.015"
          ></line>
          <line
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="21"
            x2="3"
            y1="14.985"
            y2="14.985"
          ></line>
        </svg>
        {"POSTS"}
      </div>
      {photos ? (
        photos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((data, index) => (
              <Photo key={data.docId} {...data} />
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col mt-9 items-center gap-4">
            <h4 className="text-lg font-medium">
              Start capturing and sharing your moments.
            </h4>
            <h5> Get the app to share your first photo or video.</h5>
            <div className="flex gap-2">
              <a
                href="https://time.com/4793331/instagram-social-media-mental-health/"
                target={"_blank"}
                rel="noreferrer"
              >
                <img
                  className="w-36 cursor-pointer"
                  src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
                  alt="app store icon"
                />
              </a>
              <a
                href="https://time.com/4793331/instagram-social-media-mental-health/"
                target={"_blank"}
                rel="noreferrer"
              >
                <img
                  className="w-36 cursor-pointer"
                  src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
                  alt="google play"
                />
              </a>
            </div>
          </div>
        )
      ) : (
        <div>loading.....</div>
      )}
    </section>
  );
}

export default PhotosContainer;
