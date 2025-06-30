import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted.");
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).send(user);
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You can update only your account!"));
    }

    const updateData = {};

    if (req.body.img) updateData.img = req.body.img;
    if (req.body.desc) updateData.desc = req.body.desc;

    if (req.body.newPassword) {
      if (!req.body.oldPassword) {
        return next(createError(400, "Current password is required to change password"));
      }

      const isValid = bcrypt.compareSync(req.body.oldPassword, user.password);
      if (!isValid) {
        return next(createError(400, "Incorrect current password"));
      }

      const hashedPassword = bcrypt.hashSync(req.body.newPassword, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    const { password, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } catch (err) {
    next(err);
  }
};

