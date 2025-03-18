import express from "express";
import { Server } from "socket.io";
import http from "http";
import { frontend_url } from "../constant.js";
import { getUserDetailsFromToken } from "../helpers/getUserDetailsFromToken.js";
import { set } from "mongoose";

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
    console.log("user:",user);


    //create a room
    socket.join(user?._id);
    onlineUser.add(user?._id);

    io.emit("onlineuser",Array.from(onlineUser));

    //disconnect
    socket.on("disconnect", () => {
        onlineUser.delete(user?._id);
        console.log("user disconnected",socket.id);
    });  
});

export { app, server }; //for es6+ syntax