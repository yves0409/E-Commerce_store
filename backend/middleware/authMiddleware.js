import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

//'' PROTECT ''  PIECE OF MIDDLEWARE FUCNTION HERE CAN BE USED ANYWHERE WHERE WE WANT A ROUTE TO BE PROTECTED
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized,Token not found");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized without token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as Admin");
  }
};

export { protect, admin };
