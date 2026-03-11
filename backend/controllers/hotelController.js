import Hotel from "../models/Hotel.js";

export const addHotel = async (req, res) => {
  try {

    const {
      name,
      description,
      city,
      state,
      address,
      pincode,
      pricePerNight,
      amenities,
      images
    } = req.body;

    const hotel = await Hotel.create({
      name,
      description,
      city,
      state,
      address,
      pincode,
      pricePerNight,
      amenities,
      images,
      owner: req.user._id
    });

    res.status(201).json(hotel);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getHotels = async (req, res) => {
  try {

    const hotels = await Hotel.find().populate("owner", "name email");

    res.json(hotels);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getHotel = async (req, res) => {
  try {

    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json(hotel);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateHotel = async (req, res) => {
  try {

    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedHotel);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteHotel = async (req, res) => {
  try {

    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    await hotel.deleteOne();

    res.json({ message: "Hotel deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const searchHotels = async (req, res) => {
  try {

    const {
      city,
      minPrice,
      maxPrice,
      rating,
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    // city search
    if (city) {
      query.city = { $regex: city, $options: "i" };
    }

    // price filter
    if (minPrice || maxPrice) {
      query.pricePerNight = {};

      if (minPrice) query.pricePerNight.$gte = Number(minPrice);

      if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
    }

    // rating filter
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    const skip = (page - 1) * limit;

    const hotels = await Hotel.find(query)
      .skip(skip)
      .limit(Number(limit));

    const totalHotels = await Hotel.countDocuments(query);

    res.json({
      totalHotels,
      currentPage: Number(page),
      totalPages: Math.ceil(totalHotels / limit),
      hotels
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};