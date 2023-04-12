import express from "express";
import { registerUser } from "../controllers/userController";
import { protect } from "../middleware/loginMiddleware";
import { getMe } from "../controllers/userController";

const router = express.Router();

router.post("/api/users", registerUser);

router.get("/me", protect, getMe);

export default router;
