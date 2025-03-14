import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { backendURL } from "../constant.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../redux/userSlice.js";
import Sidebar from "../components/Sidebar.jsx";
import logo from "../assets/logo.png";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("redux user", user);
  const fetchUserDetails = async () => {
    try {
      const URL = `${backendURL}/api/userdetails`;
      const response = await axios({
        method: "get",
        url: URL,
        withCredentials: true,
      });

      console.log(response);

      dispatch(setUser(response?.data?.data));

      if (response.data.data.logout) {
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

  console.log("location:", location);
  const basePath = location.pathname === "/";
  return (
    <div className="grid lg:grid-cols-[320px_auto] h-screen max-h-screen">
      <section className={`bg-white ${!basePath && "hidden"} lg:block` }>
        <Sidebar />
      </section>

      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      <div className="lg:flex flex-col items-center justify-center hidden">
        <div>
          <img 
          src={logo}
          width="300"
          alt="image preview"
          />
        </div>
        <p className="text-2xl text-slate-500">Select user to send message</p>
      </div>
    </div>

    
  );
};

export default Home;
