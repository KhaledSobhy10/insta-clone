import React, { useEffect, useState, memo } from "react";

// import { testRemoveAllFollowing } from "../lib/user";

import Post from "./post";
import { getPostsOfFollowing } from "../lib/posts";

function Timeline({ following, currentUserId, currentUserName }) {
  // console.log("following time line ", following);

  const [posts, setPosts] = useState();

  async function getPosts() {
    // console.log("i will get posts");
    if (following && !posts) {
      const posts = await getPostsOfFollowing(following);
      setPosts(posts);
      console.log(posts);
    }
  }
  useEffect(() => {
    // console.log("im in useeffect");
    getPosts();
  }, [following]);

  return (
    <div className="col-span-2 flex flex-col items-center">
      {posts &&
        posts.map((post, index) => (
          <Post
            key={(post.photoId + index) * index}
            dateCreated={post.dateCreated}
            likesNumber={post.likes.length}
            photoCaption={post.caption}
            photoId={post.photoId}
            profileName={post.name}
            fullName={post.fullName}
            imageSrc={post.imageSrc}
            userId={post.userId}
            currentUserId={currentUserId}
            likedByCurrentUser={post.likes.includes(currentUserId)}
            docId={post.docId}
            comments={post.comments}
            currentUserName={currentUserName}
          />
        ))}
    </div>
  );
}

function compareFollowing(prevFollowing, nextFollowing) {
  if (prevFollowing.following && nextFollowing.following) {
    // console.log("not render");
    return true;
  } else {
    // console.log("will render");
    return false;
  }
}

export default memo(Timeline, compareFollowing);
