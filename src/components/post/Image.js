import React from "react";

function Image({ profileName, photoId, imageSrc }) {
  return (
    <div className="flex justify-center">
      <img className="w-full" src={imageSrc} alt="" />
    </div>
  );
}

export default Image;
