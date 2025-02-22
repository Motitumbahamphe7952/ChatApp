import express from "express";
import { registerUser } from "../controller/register.js";
import { checkEmail } from "../controller/checkEmail.js";
import { checkPassword } from "../controller/checkPassword.js";
import { userDetails } from "../controller/userDetails.js";
import { logout } from "../controller/logout.js";
import { updateUserDetails } from "../controller/updateUserDetails.js";

export const router = express.Router();

//create user api
router.post("/register", registerUser);
//checkuser email
router.post("/email", checkEmail);
//check user password
router.post("/password", checkPassword);
//login user details
router.get("/userdetails", userDetails);
//logout user
router.get("/logout", logout);
//update user details
router.post("/updateuser", updateUserDetails);
