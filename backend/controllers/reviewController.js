import Review from "../models/Review.js";
import Hotel from "../models/Hotel.js";

export const addReview = async (req, res) => {
  try {

    const { hotel, rating, comment } = req.body;

    // check existing review
    const existingReview = await Review.findOne({
      user: req.user._id,
      hotel
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You already reviewed this hotel"
      });
    }

    const review = await Review.create({
      user: req.user._id,
      hotel,
      rating,
      comment
    });

    // calculate average rating
    const reviews = await Review.find({ hotel });

    const avgRating =
      reviews.reduce((acc, item) => acc + item.rating, 0) /
      reviews.length;

    await Hotel.findByIdAndUpdate(hotel, {
      rating: avgRating,
      totalReviews: reviews.length
    });

    res.status(201).json(review);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getHotelReviews = async (req, res) => {
  try {

    const reviews = await Review.find({
      hotel: req.params.hotelId
    }).populate("user", "name");

    res.json(reviews);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};