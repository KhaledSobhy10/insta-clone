import React, { useEffect, useRef } from "react";
import "emoji-picker-element";
export default function EmojiPicker({ emojiRef }) {
  return <emoji-picker ref={emojiRef}></emoji-picker>;
}
