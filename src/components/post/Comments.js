import React, { useState } from "react";

import { Link } from "react-router-dom";
import AddComment from "./AddComment";

import { formatDistance } from "date-fns";

function Comments({
  comments,
  profileName,
  photoCaption,
  dateCreated,
  commentInput,
  currentUserName,
  docId,
}) {
  const [currentComments, setCurrentComments] = useState(comments);
  const [showAllComments, setShowAllComments] = useState(false);
  return (
    <>
      <section className="p-4 flex flex-col gap-2 font-semibold text-sm ">
        {photoCaption && (
          <div className="flex gap-2">
            <span>{`${profileName} `}</span>
            <span className="text-sm font-normal">{photoCaption}</span>
          </div>
        )}
        {currentComments?.length > 2 && (
          <p
            className="text-slate-500 cursor-pointer hover:text-slate-600 w-fit"
            onClick={() => {
              setShowAllComments((prev) => !prev);
            }}
          >
            {`${showAllComments ? "Hide" : "View all "} comments `}
          </p>
        )}
        {currentComments
          .slice(0, showAllComments ? currentComments.length : 2)
          .map((commentItem) => (
            <Link
              className="flex gap-2"
              key={commentItem.comment}
              to={`/p/${commentItem.displayName}`}
            >
              <span>{`${commentItem.displayName} `}</span>
              <span className="text-sm font-normal">{commentItem.comment}</span>
            </Link>
          ))}
        <span className="text-xs font-light text-slate-500	">
          {formatDistance(new Date(dateCreated), new Date(), {
            addSuffix: true,
          })}
        </span>
      </section>
      <AddComment
        commentInput={commentInput}
        currentUserName={currentUserName}
        docId={docId}
        setCurrentComments={setCurrentComments}
      />
    </>
  );
}

export default Comments;
