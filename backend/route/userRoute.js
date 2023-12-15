import express from "express";
const router = express.Router();
import { getAllUsers, registerUser, loginUser } from "../controller/userController.js";

router.get("/", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;