import Favorite from "../models/favorite.model.js";

export const addFavorite = async (req, res) => {
  try {
    const existing = await Favorite.findOne({
      userId: req.userId,
      gigId: req.body.gigId,
    });
    if (existing) {
      return res.status(400).json("This gig is already in favorites.");
    }

    const favorite = new Favorite({
      userId: req.userId,
      gigId: req.body.gigId,
    });
    await favorite.save();
    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const removeFavorite = async (req, res) => {
  try {
    await Favorite.findOneAndDelete({
      userId: req.userId,
      gigId: req.params.gigId,
    });
    res.status(200).json("Removed from favorites.");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.userId });
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
