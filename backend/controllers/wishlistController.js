import Wishlist from "../models/Wishlist.js";

export const addToWishlist = async (req, res) => {
  try {

    const { hotel } = req.body;

    const exists = await Wishlist.findOne({
      user: req.user._id,
      hotel
    });

    if (exists) {
      return res.status(400).json({
        message: "Hotel already in wishlist"
      });
    }

    const wishlist = await Wishlist.create({
      user: req.user._id,
      hotel
    });

    res.status(201).json(wishlist);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const removeFromWishlist = async (req, res) => {
  try {

    const { hotelId } = req.params;

    await Wishlist.findOneAndDelete({
      user: req.user._id,
      hotel: hotelId
    });

    res.json({ message: "Removed from wishlist" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getWishlist = async (req, res) => {
  try {

    const wishlist = await Wishlist.find({
      user: req.user._id
    }).populate("hotel");

    res.json(wishlist);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};