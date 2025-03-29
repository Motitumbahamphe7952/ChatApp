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
import { FaPlus } from "react-icons/fa6";
import { IoMdImages } from "react-icons/io";
import { IoVideocam } from "react-icons/io5";
import { FaImages } from "react-icons/fa6";
import { uploadFile } from "../helpers/uploadFile";
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
  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false); // State to control image/video upload modal
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  }); // State to store message input

  const handleUploadImageVideoOpen = () => {
    setOpenImageVideoUpload((preve) => !preve); // Toggle the image/video upload modal
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("No file selected.");
      return;
    }

    try {
      console.log("Uploading file:", file); // Debugging

      const uploadedPhotoUrl = await uploadFile(file); // ✅ Fix: This now gets the actual URL
      if (uploadedPhotoUrl) {
        setMessage((preve) => {
          return {
            ...preve,
            imageUrl: uploadedPhotoUrl?.secure_url,
          };
        });
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading photo.");
    }
  };

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("No file selected.");
      return;
    }

    try {
      console.log("Uploading file:", file); // Debugging

      const uploadedPhotoUrl = await uploadFile(file); // ✅ Fix: This now gets the actual URL
      if (uploadedPhotoUrl) {
        setMessage((preve) => {
          return {
            ...preve,
            videoUrl: uploadedPhotoUrl?.secure_url,
          };
        });
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading photo.");
    }
  };

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
      <header className="sticky py-2 px-4 top-0 h-16 bg-white flex justify-between items-center">
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
      <section className="h-[calc(100vh-8rem)] overflow-x-hidden overflow-y-scroll scrollbar">
        {/* upload image display */}
        {
          message?.imageUrl && (
            <div className="w-full h-full bg-slate-700/30 flex justify-center items-center rounded overflow-hidden">
              <div className="bg-white p-3">
                <img
                  src={message?.imageUrl}
                  width={300}
                  height={300}
                  alt="Message Image"
                />
              </div>
            </div>
          )
        }
        show all messages
      </section>
      <section className="h-16 bg-white flex items-center px-2">
        <div className=" relative ">
          <button
            onClick={handleUploadImageVideoOpen}
            className="flex justify-center items-center w-6 h-6 rounded-full text-slate-600  hover:bg-primary hover:text-white cursor-pointer"
          >
            <FaPlus size={15} />
          </button>

          {/* video and image  */}
          {openImageVideoUpload && (
            <div className="bg-white shadow rounded absolute bottom-16 w-36 p-2 m-1">
              <form>
                <label
                  htmlFor="uploadImage"
                  className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer rounded-md"
                >
                  <div className="text-blue-500">
                    <IoMdImages size={25} />
                  </div>
                  <p>Image</p>
                </label>
                <label
                  htmlFor="uploadVideo"
                  className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer rounded-md"
                >
                  <div className="text-purple-500">
                    <IoVideocam size={25} />
                  </div>
                  <p>Video</p>
                </label>
                <input
                  type="file"
                  id="uploadImage"
                  onChange={handleUploadImage}
                />
                <input
                  type="file"
                  id="uploadVideo"
                  onChange={handleUploadVideo}
                />
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default MessagePage;
