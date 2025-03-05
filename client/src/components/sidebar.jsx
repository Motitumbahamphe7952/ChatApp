import React, { useState } from "react";
import { LuUserRoundPlus } from "react-icons/lu";
import { PiChatTeardropDots } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";


const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const [editUserOpen, setEditUserOpen] = useState(false);

  return (
    <div className="w-full h-full">
      <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-l py-5 text-slate-600 flex flex-col justify-between">
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${
                isActive && "bg-slate-200"
              }`
            }
            title=" Let's Chat"
          >
            <PiChatTeardropDots size={30} />
          </NavLink>

          <div
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
            title=" add friend"
          >
            <LuUserRoundPlus size={20} />
          </div>
        </div>
        <div className="">
          <div className="px-0.5">
          <button className="flex justify-center items-center text-lg font-semibold overflow-hidden  bg-slate-200 rounded-full cursor-pointer" title={user?.name} onClick={()=>{setEditUserOpen(true)}}>
            <Avatar width={40} height={40} name={user?.name} />
          </button>
          </div>
          <button
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
            title="logout"
          >
            <LuLogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
