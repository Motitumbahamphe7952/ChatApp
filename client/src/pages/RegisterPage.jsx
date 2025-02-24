import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profilepic: "",
  });

  const [uploadPhoto, setUploadPhoto] = useState("");
  const handleUploadPhoto = (e) => {
    const file = e.target.files[0];
    setUploadPhoto(file);
    console.log("Upload Photo:", uploadPhoto);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleClearUploadPhoto = () => {
    setUploadPhoto(null);
  };

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4 ">
        <h3>Welcome to Chat App</h3>

        <form className="grid gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder=" Enter your name"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" Enter your email"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder=" Enter your password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="profilepic">
              Photo :
              <div className="h-14 bg-slate-200 flex justify-center items-center border-3 border-transparent rounded hover:border-primary cursor-pointer">
                <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                  {uploadPhoto?.name
                    ? uploadPhoto?.name
                    : "Upload Profile Photo"}
                </p>
                {uploadPhoto?.name && (
                  <button
                    className="text-xl ml-2 hover:text-red-500"
                    onClick={handleClearUploadPhoto}
                  >
                    <IoMdCloseCircle />
                  </button>
                )}
              </div>
            </label>

            <input
              type="file"
              id="profilepic"
              name="profilepic"
              className="bg-slate-100 px-2 py-1 focus:outline-primary hidden"
              onChange={handleUploadPhoto}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
