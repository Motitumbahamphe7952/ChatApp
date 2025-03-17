import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import Loading from "./Loading";

const SearchUser = () => {
    const [searchUser, setSearchUser] = useState([]);
    const [loading, setLoading] = useState(true);
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-700/40">
      <div className="w-full max-w-2xl mx-auto mt-10">
        {/* input search user */}
        <div className=" bg-white rounded h-10 overflow-hidden border-b-2 border-primary flex">
          <div className="h-10 w-10 flex items-center justify-center text-slate-600">
            <LuSearch size={20}/>
          </div>
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="w-full py-1 h-full px-1 "
          />
        </div>

        {/* display search user */}
        <div className=" bg-white mt-2 w-full p-4">
            {
                searchUser.length === 0 && !loading && (
                    <p className="text-center text-slate-500">No user found!</p>
                )
            }

            {
                loading && (
                    <div className="flex items-center">
                        <Loading />
                        <p className="pl-2">Loading...</p>
                    </div>
                )
            }

        </div>
      </div>
    </div>
  );
};

export default SearchUser;
