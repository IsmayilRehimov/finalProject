import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, "Token is not valid!"));

    if (payload.role !== "admin") {
      return next(createError(403, "Only admins can access this route!"));
    }

    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    req.role = payload.role;
    next();
  });
};
