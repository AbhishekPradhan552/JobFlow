import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    let token;
    //read token from authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    //if token missing
    if (!token) {
      return res.status(401).json({
        message: "Not authorised, token missing",
      });
    }
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //decoded = {userId, iat , exp}

    //find user in DB
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        message: "User no longer exists",
      });
    }
    //Attach user to request
    req.user = user;

    //continue next to  middleware/controller
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, token invalid",
    });
  }
};
