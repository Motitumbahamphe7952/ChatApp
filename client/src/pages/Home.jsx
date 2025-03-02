import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { backendURL } from "../constant.js";
import axios from "axios";

const Home = () => {
  const fetchUserDetails = async () => {
    try {
      const URL = `${backendURL}/api/userdetails`;
      const response = await axios({
        method: "get",
        url: URL,
        withCredentials: true,
      });
      console.log("current user details", response?.data?.data);
    } catch (error) {
      console.log("error:", error);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  },[])
  return (
    <div>
      Home
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default Home;
