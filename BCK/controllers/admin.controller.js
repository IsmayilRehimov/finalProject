import User from "../models/user.model.js";
import Gig from "../models/gig.model.js";
import reviewModel from "../models/review.model.js";
import favoriteModel from "../models/favorite.model.js";
import orderModel from "../models/order.model.js"; 

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Delete all gigs posted by this user
    await Gig.deleteMany({ userId });

    // Delete reviews written by this user
    await reviewModel.deleteMany({ userId });

    // Delete favorites saved by this user
    await favoriteModel.deleteMany({ userId });

    // Delete orders made by this user
    await orderModel.deleteMany({ buyerId: userId }); // Assuming orders store buyerId field

    // Finally, delete the user
    await User.findByIdAndDelete(userId);

    res.status(200).send("User and their related data deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find();
    res.status(200).json(gigs);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteGig = async (req, res) => {
  try {
    const gigId = req.params.id;

    // Delete reviews associated with this gig
    await reviewModel.deleteMany({ gigId });

    // Delete the gig itself
    await Gig.findByIdAndDelete(gigId);

    res.status(200).send("Gig and related reviews deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
};


// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete order by ID
export const deleteOrder = async (req, res) => {
  try {
    await orderModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Order deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete review by ID
export const deleteReview = async (req, res) => {
  try {
    await reviewModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Review deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
