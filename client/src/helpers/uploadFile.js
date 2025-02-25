import axios from "axios";

const url = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
}/auto/upload`;

console.log("url:", url);

export const uploadFile = async (file) => {
    const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Chat_App_File");

  const response = await axios.post(url,formData);
//   const responseData = await response.json();
  return response.data;
};
