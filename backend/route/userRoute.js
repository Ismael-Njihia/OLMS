import express from "express";
const router = express.Router();
import { getAllUsers, registerUser, loginUser, logoutUser} from "../controller/userController.js";
import { authenticateToken, admin, staff } from "../middleware/authMiddleware.js";

router.get("/",authenticateToken,getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default router;