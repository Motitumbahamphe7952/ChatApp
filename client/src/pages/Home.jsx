import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { backendURL } from "../constant.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../redux/userSlice.js";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("redux user", user);
  const fetchUserDetails = async () => {
    try {
      const URL = `${backendURL}/api/userdetails`;
      const response = await axios({
        method: "get",
        url: URL,
        withCredentials: true,
      });

      dispatch(setUser(response?.data?.data));

      if (response.data.logout) {
        dispatch(logout());
        navigate("/login");
      }
      console.log("current user details", response?.data?.data);
    } catch (error) {
      console.log("error:", error);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <div className="grid lg:grid-cols-[320px_auto] h-screen max-h-screen">
      <section className="bg-white">
        sidebar
      </section>

      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default Home;
