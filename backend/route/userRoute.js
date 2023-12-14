import express from "express";
const router = express.Router();
import { getAllUsers, registerUser } from "../controller/userController.js";

router.get("/", getAllUsers);
router.post("/register", registerUser);

export default router;