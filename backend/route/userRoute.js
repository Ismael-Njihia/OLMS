import express from "express";
const router = express.Router();
import { getAllUsers, 
    getUserTransactions, registerUser, loginUser, logoutUser, getUserById} from "../controller/userController.js";
import { authenticateToken, admin, staff } from "../middleware/authMiddleware.js";

router.get("/",authenticateToken,getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/:id", authenticateToken, getUserById);
router.get("/transactions/:id", authenticateToken, getUserTransactions);


export default router;