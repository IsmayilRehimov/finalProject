import User from "../models/user.model.js";
import Gig from "../models/gig.model.js";
import reviewModel from "../models/review.model.js";
import favoriteModel from "../models/favorite.model.js";
import orderModel from "../models/order.model.js"; 

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await Gig.deleteMany({ userId });

    await reviewModel.deleteMany({ userId });

    await favoriteModel.deleteMany({ userId });

    await orderModel.deleteMany({ buyerId: userId }); 

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

    await reviewModel.deleteMany({ gigId });

    await Gig.findByIdAndDelete(gigId);

    res.status(200).send("Gig and related reviews deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
};


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


export const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteReview = async (req, res) => {
  try {
    await reviewModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Review deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
