import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//Route : POST /api/users/login
//What it does: fAuth user & getting a token
//Who : Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  //if there is a usere and the passwords match this will be returned (id,name,email,etc)
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//Route : POST /api/users
//What it does: Register new user
//Who : Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//Route : GET /api/users/profile
//What it does: get a users profile
//Who : Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id, //userInfo passed to the data in the userReducer 'USER_LOGIN_SUCCES'
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    console.log("user found");
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//Route : PUT /api/users/profile
//What it does: Udates a users profile
//Who : Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); //req.user._id is the logged in user

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//Route : GET /api/users
//What it does: get all users
//Who : Private-ADMIN
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//Route : DELETE /api/users/:id
//What it does: delete a user
//Who : Private-ADMIN
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Route : GET /api/users/:id
//What it does: Get user by Id
//Who : Private-ADMIN
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Route : PUT /api/users/:i
//What it does: Udate a user
//Who : Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id); //req.user._id is the logged in user

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // user.isAdmin = req.body.isAdmin;
    user.isAdmin =
      req.body.isAdmin === undefined ? user.isAdmin : req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
