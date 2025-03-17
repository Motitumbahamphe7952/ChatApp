import React, { useState } from "react";
import { LuUserRoundPlus } from "react-icons/lu";
import { PiChatTeardropDots } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { BsBoxArrowUpLeft } from "react-icons/bs";
import EditUserDetails from "./EditUserDetails";
import SearchUser from "./SearchUser";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [openSearchUser, setOpenSearchUser] = useState(false);
  return (
    <div className="w-full h-full grid grid-cols-[48px_auto]">
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
            onClick={()=>setOpenSearchUser(true)}
          >
            <LuUserRoundPlus size={20} />
          </div>
        </div>
        <div>
          <div className="px-1">
            <button
              className="flex justify-center items-center text-lg font-semibold overflow-hidden bg-slate-200 rounded-full cursor-pointer"
              title={user?.name}
              onClick={() => {
                setEditUserOpen(true);
              }}
            >
              <Avatar
                width={40}
                height={40}
                name={user?.name}
                profilepic={user?.profilepic}
              />
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
      <div className="w-full">
        <h2 className="text-xl font-bold p-4 text-slate-800 h-14">Message</h2>
        <div className="bg-slate-200 p-[0.5px]"></div>

        <div className="h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
          {allUser.length === 0 && (
            <div className="mt-10">
              <div className="flex justify-center items-center pt-10 pb-3">
                <BsBoxArrowUpLeft size={30} 
                className="text-slate-800"/>
              </div>
              <p className="text-lg text-center text-slate-600">
                Explore users to start a conversations with
              </p>
            </div>
          )}
        </div>
      </div>
      {/* edit user details */}
      {editUserOpen && (
        <EditUserDetails
          onClose={() => {
            setEditUserOpen(false);
          }}
          user={user}
        />
      )}

      {/* search user */} 
      {
        openSearchUser && (
          <SearchUser onClose={()=>setOpenSearchUser(false)}/>
        )
      }


    </div>
  );
};

export default Sidebar;
