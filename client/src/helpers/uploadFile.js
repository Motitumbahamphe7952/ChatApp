import axios from "axios";
import { cloudName } from "../constant";

const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

console.log("url:", url);

export const uploadFile = async (file) => {
    const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Chat_App_File");

  const response = await axios.post(url,formData);
//   const responseData = await response.json();
  return response.data;
};
