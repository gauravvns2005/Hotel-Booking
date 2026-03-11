import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import {
  addRoom,
  getRooms,
  getRoomById,
  getRoomsByHotel,
  updateRoom,
  deleteRoom,
} from "../controllers/roomController.js";

const router = express.Router();

router.post("/", protect, adminOnly, addRoom);
router.get("/", getRooms);
router.get("/hotel/:hotelId", getRoomsByHotel);
router.get("/:id", getRoomById);
router.put("/:id", protect, adminOnly, updateRoom);
router.delete("/:id", protect, adminOnly, deleteRoom);

export default router;