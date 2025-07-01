import express from "express";
import { addFavorite, removeFavorite, getFavorites } from "../controllers/favorite.controller.js";
import { verifyToken } from "../middleware/jwt.js";


const router = express.Router();

// get user favorites
router.get("/", verifyToken, getFavorites);

// add to favorites
router.post("/", verifyToken, addFavorite);

// remove from favorites
router.delete("/:gigId", verifyToken, removeFavorite);

export default router;
