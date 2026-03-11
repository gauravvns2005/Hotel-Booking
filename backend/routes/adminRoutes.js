import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

import {
  getStats,
  getAllUsers,
  deleteUser,
  getAllBookings,
  deleteHotelAdmin,
  getAllReviews,
  deleteReview,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", protect, adminOnly, getStats);
router.get("/users", protect, adminOnly, getAllUsers);
router.delete("/users/:id", protect, adminOnly, deleteUser);
router.get("/bookings", protect, adminOnly, getAllBookings);
router.delete("/hotels/:id", protect, adminOnly, deleteHotelAdmin);
router.get("/reviews", protect, adminOnly, getAllReviews);
router.delete("/reviews/:id", protect, adminOnly, deleteReview);

export default router;