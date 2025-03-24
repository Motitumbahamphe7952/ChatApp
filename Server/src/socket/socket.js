import express from "express";
import { Server } from "socket.io";
import http from "http";
import { frontend_url } from "../constant.js";
import { getUserDetailsFromToken } from "../helpers/getUserDetailsFromToken.js";
import { User } from "../Schema/model.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `${frontend_url}`,
    credentials: true,
  },
});

const onlineUser = new Set();

io.on("connection", async(socket) => {

    console.log("user connected",socket.id);

    const token = socket.handshake.auth.token;

    //current user details
    const user = await getUserDetailsFromToken(token);
    // console.log("user:",user);

    const user_Id = user?._id;

    //create a room
    socket.join(user?._id);
    onlineUser.add(user_Id);

    io.emit("onlineuser",Array.from(onlineUser));

    socket.on("message-page", async(userId)=>{
      console.log("userId",userId);
      const userDetails = await User.findById(userId).select("-password");

      if (!userDetails) {
        console.error("❌ User not found:", userId);
        return;
      }

      const payload = {
        _id : userDetails?._id,
        name : userDetails?.name,
        email : userDetails?.email,
        online : onlineUser.has(userId)
      }

      socket.emit("message-user",payload);
    })

    //disconnect
    socket.on("disconnect", () => {
        onlineUser.delete(user?._id);
        console.log("user disconnected",socket.id);
    });  
});

export { app, server }; //for es6+ syntax