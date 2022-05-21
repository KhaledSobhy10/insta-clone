import React from "react";

function Photo({ docId, imgSrc, totalComments, totalLikes, caption }) {
  return (
    <div className="relative w-80">
      <span className="bg-slate-600/25 opacity-0 hover:opacity-100 w-full h-full absolute cursor-pointer flex items-center justify-center  gap-2 text-white font-semibold">
        <span className="flex items-center justify-center gap-2">
          <svg
            aria-label="likes"
            color="white"
            fill="white"
            height="24"
            role="img"
            viewBox="0 0 48 48"
            width="24"
          >
            <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
          </svg>
          {totalLikes}
        </span>
        <span className="flex items-center justify-center gap-2">
          <svg
            aria-label="Comments"
            color="white"
            fill="white"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
              fill="white"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
          {totalComments}
        </span>
      </span>
      <img src={imgSrc} alt={caption} className="rounded" />
    </div>
  );
}

export default Photo;
