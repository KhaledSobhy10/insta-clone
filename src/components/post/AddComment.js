import React, { useRef, useState, useEffect } from "react";

import { addCommentToPost } from "../../lib/posts";

import EmojiPicker from "../EmojiPicker";

export default function AddComment({
  commentInput,
  docId,
  currentUserName,
  setCurrentComments,
}) {
  const [newComment, setNewComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const testEmojiContainer = useRef(null);

  useEffect(() => {
    const picker = testEmojiContainer?.current;
    if (showEmojiPicker) {
      console.log(picker);
      picker.focus();
      picker?.addEventListener("emoji-click", handleEmojiClick);
      picker?.addEventListener("blur", handleShowEmoji);
    }

    return () => {
      picker?.removeEventListener("emoji", handleEmojiClick);
      picker?.removeEventListener("blur", handleShowEmoji);
    };
  }, [showEmojiPicker]);

  const handleEmojiClick = (event) => {
    // console.log(event.detail.unicode);
    setNewComment((prev) => prev + event.detail.unicode);
  };

  const handleShowEmoji = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleAddComment = () => {
    setCurrentComments((prev) => [
      ...prev,
      { displayName: currentUserName, comment: newComment },
    ]);
    addCommentToPost(docId, currentUserName, newComment);
    setNewComment("");
  };

  return (
    <>
      <section className="p-4 flex gap-2 border-t-2 dark:border-slate-500 relative">
        <div className="absolute bottom-[50px] left-0 ">
          {showEmojiPicker && <EmojiPicker emojiRef={testEmojiContainer} />}
        </div>
        <svg
          aria-label="Emoji"
          className="cursor-pointer dark:text-white text-[#262626]"
          color="currentColor"
          fill="currentColor"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
          onClick={handleShowEmoji}
        >
          <path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path>
        </svg>
        <input
          ref={commentInput}
          type={"text"}
          placeholder={"Add a comment..."}
          className="flex-1 text-sm dark:bg-slate-800"
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
          onFocus={() => {
            setShowEmojiPicker(false);
          }}
          value={newComment}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newComment?.trim()) handleAddComment();
          }}
        />
        <button
          disabled={!newComment?.trim()}
          className={`text-sky-500 font-semibold ${
            newComment?.trim() ? "cursor-pointer" : "opacity-25"
          } `}
          onClick={handleAddComment}
        >
          Post
        </button>
      </section>
    </>
  );
}
