import razorpay from "../config/razorpay.js";
import Booking from "../models/Booking.js";
import crypto from "crypto";

export const createOrder = async (req, res) => {
  try {

    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const options = {
      amount: booking.totalPrice * 100, 
      currency: "INR",
      receipt: booking._id.toString()
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const verifyPayment = async (req, res) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {

      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        { paymentStatus: "paid" },
        { new: true }
      );

      return res.json({
        message: "Payment successful",
        booking
      });

    } else {
      return res.status(400).json({ message: "Payment verification failed" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};