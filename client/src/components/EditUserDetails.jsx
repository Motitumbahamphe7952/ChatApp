import React, { useRef, useState } from "react";
import Avatar from "./Avatar";
import { uploadFile } from "../helpers/uploadFile.js";
import Divider from "./Divider.jsx";
import { useDispatch } from "react-redux";

const EditUserDetails = ({ onClose, data }) => {
  const [formData, setformData] = useState({
    name: data?.name || "",
    profilepic: data?.profilepic || "",
  });
  const uploadPhotoRef = useRef();
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setformData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
    setformData((preve) => {
      return {
        ...preve,
        profilepic: uploadPhoto,
      };
    });
   
  };

  const handleOpenUploadPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();

    uploadPhotoRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Updated Data:", formData);
    onClose();
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700/40 flex justify-center items-center">
      {/* here bg-gray-700/40 ---means 40% opacity and 700 contrast */}
      <div className="bg-white p-4 m-1 rounded w-full max-w-sm">
        <h2 className="text-2xl font-semibold  mt-0">Profile Details</h2>
        <p className="text-md">Edit user details :</p>

        <form className="grid gap-3 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <div className="flex justify-center item-center">
              <Avatar
                key={formData.profilepic}
                width={120}
                height={120}
                textSize="text-4xl"
                imageUrl={formData?.profilepic}
                name={data?.name}
              />
            </div>
            <label htmlFor="profilepic">
              <button
                className="bg-primary text-white mt-3 px-2 py-1 rounded hover:bg-secondary"
                onClick={handleOpenUploadPhoto}
              >
                Change Photo
              </button>
              <input
                type="file"
                id="profilepic"
                className="hidden"
                onChange={handleUploadPhoto}
                ref={uploadPhotoRef}
              />
            </label>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleOnChange}
              className="w-full py-1 px-2 focus:outline-primary rounded bg-slate-100 border-0.5"
            />
          </div>
          <Divider />
          <div className="flex gap-2 w-fit ml-auto mt-3">
            <button
              onClick={onClose}
              className="border-primary border text-primary px-4 py-1 rounded hover:bg-primary hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border-primary border bg-primary text-white px-4 py-1 rounded hover:bg-secondary"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserDetails;
