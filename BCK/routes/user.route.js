import express from "express";
import { deleteUser, getUser, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";
import { updateDarkMode } from "../controllers/user.controller.js";
import User from "../models/user.model.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);
router.put("/:id", verifyToken, updateUser); // 🌟 Kullanıcı güncelleme eklendi

router.put("/:id/theme", verifyToken, updateDarkMode);


// 🔥 Toplu kullanıcı bilgisi alma endpointi
router.post("/batch", verifyToken, async (req, res, next) => {
  try {
    const ids = req.body.ids;
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).send("IDs array is required.");
    }

    const users = await User.find(
      { _id: { $in: ids } },
      "username _id img"
    );

    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
});

export default router;
