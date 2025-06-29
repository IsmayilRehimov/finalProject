import express from "express";
import {
  createMessage,
  getMessages,
  deleteMessage,
} from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createMessage);
router.get("/:id", verifyToken, getMessages);
router.delete("/:id", verifyToken, deleteMessage);

export default router;
