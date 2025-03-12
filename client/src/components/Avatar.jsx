import React from "react";
import { useSelector } from "react-redux";
import { PiUserCircleThin } from "react-icons/pi";

const Avatar = ({ width = 50, height = 50 ,textSize= "text-lg" }) => {
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


  const bgColors = [
    "bg-slate-100",
    "bg-teal-100",
    "bg-red-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-gray-100",
    "bg-cyan-100",
    "bg-sky-100",
    "bg-blue-100",
  ];

  const randomNumber = Math.floor(Math.random() * 9)
  const selectedBgColor = bgColors[randomNumber];
  return (
    <div className="text-slate-800 overflow-hidden rounded-full">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          width={width}
          height={height}
          key={imageUrl}
          className="overflow-hidden rounded-full aspect-square object-cover"
        />
      ) : name ? (
        <div
          style={{ width: width + "px", height: height + "px" }}
          className={`flex justify-center items-center overflow-hidden rounded-full ${textSize} text-slate-700 ${selectedBgColor}`}
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
