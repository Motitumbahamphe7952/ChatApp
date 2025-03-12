import React, { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import { uploadFile } from "../helpers/uploadFile.js";
import Divider from "./Divider.jsx";

const EditUserDetails = ({ onClose, data }) => {
  const [formData, setformData] = useState({
    name: data?.name || "",
    profilepic: data?.profilepic || "",
  });


  useEffect(() => {
    if (data) {
      setformData({
        name: data.name || "",
        profilepic: data.profilepic || "",
      });
    }
  }, [data]);
  // The useEffect hook is used here to ensure that formData is updated 
// whenever the data prop changes. This is important because data might 
// be coming from an API or a parent component asynchronously, and it may 
// not be available when the component first renders. 

// Without useEffect, formData would only be set once during initialization 
// and would not update if new data is received later. By using useEffect 
// with [data] as the dependency array, we make sure that whenever data 
// changes, formData is updated accordingly, keeping the UI in sync with 
// the latest user details.


  console.log("data:", data);
  console.log("Updated Data:", formData);

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
    if (!file) {
      console.log("No file selected");
      return;
    }
    // const uploadPhoto = await uploadFile(file);
    // setformData((preve) => {
    //   return {
    //     ...preve,
    //     profilepic: uploadPhoto?.secure_url || preve.profilepic,
    //   };
    // });
    try {
      const uploadPhoto = await uploadFile(file);
      console.log("Upload Response:", uploadPhoto); // Debugging line
  
      // Directly use the returned string if it's not an object
      const uploadedUrl = typeof uploadPhoto === "string" ? uploadPhoto : uploadPhoto?.secure_url;
  
      if (uploadedUrl) {
        setformData((prev) => ({
          ...prev,
          profilepic: uploadedUrl,
        }));
      } else {
        console.error("Upload failed: secure_url not found");
      }
    } catch (error) {
      console.error("File upload error:", error);
    }
   
  };

  const handleOpenUploadPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();

    uploadPhotoRef.current.click();
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log("Updated Data:", formData);
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
                className=" font-semibold bg-primary text-white mt-3 px-2 py-1 rounded hover:bg-secondary"
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
