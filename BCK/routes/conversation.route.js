import express from "express";
import {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
  getConversationByRecipient,
} from "../controllers/conversation.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", verifyToken, getConversations);
router.post("/", verifyToken, createConversation);
router.get("/single/:id", verifyToken, getConversationByRecipient);
router.get("/:id", verifyToken, getSingleConversation);
router.put("/:id", verifyToken, updateConversation);

export default router;
