// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";

// const MessagePage = () => {
//   const params = useParams();
//   const socketConnection = useSelector((state) => state?.user?.socketConnection);
//   console.log(params.userId);

//   useEffect(() => {
//     if(socketConnection){
//       socketConnection.emit("message-page", params.userId);
//     }
//   }, [socketConnection]);

//   return(
//     <div>
//       MessagePage
//     </div>
//     );
// };

// export default MessagePage;

import React, { useEffect, useState } from "react";
import { data, Link, useParams } from "react-router-dom";
import { useSocket } from "../socketContext";
import Avatar from "./Avatar"; // ✅ Use context instead of Redux
import { useSelector } from "react-redux";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaAngleLeft } from "react-icons/fa6";

const MessagePage = () => {
  const params = useParams();
  const { socket } = useSocket(); // ✅ Get socket from context
  const user = useSelector((state) => state?.user); // ✅ Get user from Redux store
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profilepic: "",
    online: false,
    _id: "",
  }); // State to store user data

  console.log(params.userId);

  useEffect(() => {
    if (socket) {
      socket.emit("message-page", params.userId); // ✅ Send event to backend

      socket.on("message-user", (payload) => {
        console.log("Received message-user event:", payload);
        setDataUser(payload); // ✅ Update state with received data
      });
    }
  }, [socket, params?.userId, user]);

  return (
    <div>
      <header className="sticky py-2 px-4 top-0 h-16 bg-white flex justify-between items-center ">
        <div className="flex items-center gap-3">
          <Link to={"/"} className="lg-hidden">
            <FaAngleLeft size={20} className="cursor-pointer text-slate-600" />
          </Link>
          <div>
            <Avatar
              width={50}
              height={50}
              profilepic={dataUser?.profilepic}
              name={dataUser?.name}
              userId={dataUser?._id}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg my-0 pl-2 text-ellipsis line-clamp-1">
              {dataUser?.name}
            </h3>
            <p className="my-1 -mt-1 pl-2  text-sm">
              {dataUser?.online ? (
                <span className="text-primary">Online</span>
              ) : (
                <span className="text-slate-400">Offline</span>
              )}
            </p>
          </div>
        </div>
        <div>
          <button className="cursor-pointer text-slate-600 hover:text-primary">
            <HiOutlineDotsVertical size={25} />
          </button>
        </div>
      </header>
      {/* {show all messages } */}
      <section className="h-[calc(100vh-64px)] bg-red-500">
              show all messages
      </section>

    </div>
  );
};

export default MessagePage;
