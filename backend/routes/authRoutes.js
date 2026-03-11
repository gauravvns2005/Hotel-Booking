import express from "express";
import { registerUser, loginUser, getProfile, seedAdmin } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.post("/seed-admin", seedAdmin);

export default router;