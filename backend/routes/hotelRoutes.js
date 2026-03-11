import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  addHotel,
  getHotels,
  getHotel,
  updateHotel,
  deleteHotel,
  searchHotels
} from "../controllers/hotelController.js";

const router = express.Router();

router.post("/", protect, addHotel);

router.get("/", getHotels);

router.get("/search", searchHotels);

router.get("/:id", getHotel);

router.put("/:id", protect, updateHotel);

router.delete("/:id", protect, deleteHotel);


export default router;