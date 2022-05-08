import React, { useRef } from "react";
import Head from "./Head";
import Image from "./Image";
import Actions from "./Actions";
import Comments from "./Comments";

function Post({
  profileName,
  photoId,
  dateCreated,
  likesNumber,
  photoCaption,
  imageSrc,
  fullName,
  userId,
  likedByCurrentUser,
  currentUserId,
  docId,
  comments,
  currentUserName,
}) {
  const commentInput = useRef(null);
  const handleCommentClicked = () => commentInput.current.focus();
  return (
    <div className="min-w-[300px] max-w-[500px] border-2 rounded-lg mt-6 mb-8 bg-white">
      <Head userId={userId} profileName={profileName} fullName={fullName} />
      <Image profileName={profileName} photoId={photoId} imageSrc={imageSrc} />
      <Actions
        docId={docId}
        liked={likedByCurrentUser}
        currentUserId={currentUserId}
        totalLikes={likesNumber}
        handleCommentClicked={handleCommentClicked}
      />
      <Comments
        comments={comments}
        profileName={profileName}
        dateCreated={dateCreated}
        photoCaption={photoCaption}
        commentInput={commentInput}
        currentUserName={currentUserName}
        docId={docId}
      />
    </div>
  );
}

export default Post;
