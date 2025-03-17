import React from "react";
import Avatar from "./Avatar";

const UserSearchCards = ({user}) => {
  return (
    <div className="flex items-center gap-3 p-1">
        <div>
            <Avatar
            width={50}
            height={50}
            name={user?.name}
            profilepic={user?.profilepic}/>
        </div>
        <div>
            <div className="font-semibold">
                {user?.name}
            </div>
            <p className="text-sm">{user?.email}</p>
        </div>
    </div>
);
};

export default UserSearchCards;
