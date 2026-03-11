import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true
    },

    roomType: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    maxGuests: {
      type: Number,
      required: true
    },

    totalRooms: {
      type: Number,
      required: true
    },

    images: [
      {
        type: String
      }
    ]
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;