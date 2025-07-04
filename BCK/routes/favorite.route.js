import express from "express";
import { addFavorite, removeFavorite, getFavorites } from "../controllers/favorite.controller.js";
import { verifyToken } from "../middleware/jwt.js";


const router = express.Router();

router.get("/", verifyToken, getFavorites);

router.post("/", verifyToken, addFavorite);

router.delete("/:gigId", verifyToken, removeFavorite);

export default router;
