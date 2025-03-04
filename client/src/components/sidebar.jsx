import React from "react";
import { LuUserRoundPlus } from "react-icons/lu";
import { PiChatTeardropDots } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
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
        <button>
            
        </button>
        <button
          className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
          title="logout"
        >
          <span>
            <LuLogOut size={20} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
