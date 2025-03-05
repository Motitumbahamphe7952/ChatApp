import React from "react";
import { useSelector } from "react-redux";
import { PiUserCircleThin } from "react-icons/pi";

const Avatar = ({ width = 50, height = 50 }) => {
  const {
    _id: userId,
    name,
    profilepic: imageUrl,
  } = useSelector((state) => state.user);

  let avatarName = "";
  if (name) {
    const splitName = name?.split(" ");
    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else {
      avatarName = splitName[0][0];
    }
  }
  return (
    <div className="text-slate-800 overflow-hidden rounded-full">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          width={width}
          height={height}
          className="overflow-hidden rounded-full"
        />
      ) : name ? (
        <div
          style={{ width: width + "px", height: height + "px" }}
          className="flex justify-center items-center overflow-hidden rounded-full"
        >
          {avatarName}
        </div>
      ) : (
        <PiUserCircleThin size={width} />
      )}
    </div>
  );
};

export default Avatar;
