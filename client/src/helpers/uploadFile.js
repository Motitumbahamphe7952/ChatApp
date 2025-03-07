import axios from "axios";
import { cloudName } from "../constant";

const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

console.log("url:", url);

export const uploadFile = async (file) => {
    const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Chat_App_File");

try {
  const response = await axios.post(url, formData);
  console.log("Cloudinary Response:", response.data); // Debugging
  return response.data.secure_url; // ✅ Fixed: Now returning correct URL
} catch (error) {
  console.error("File Upload Error:", error);
  return null;
}
};
