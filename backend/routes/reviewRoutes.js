import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  addReview,
  getHotelReviews
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", protect, addReview);

router.get("/:hotelId", getHotelReviews);

export default router;