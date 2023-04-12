import expressAsyncHandler from "express-async-handler";
import { User } from "../models/userModel";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

const secret = (): string => {
  let newSecret = process.env.JWT_SECRET;
  if (typeof newSecret !== "string") {
    throw new Error("JWT Secret invalid");
  } else return newSecret;
};

//Generate JWT
const generateToken = (id: string) => {
  return sign({ id }, secret(), {
    expiresIn: "30d",
  });
};

// Register new user
// POST /api/users
export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const defaultDescription = `${name} has not created a profile yet.`;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    description: defaultDescription,
    private: false,
    recipes: [],
    favorites: [],
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user.name),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Authenticate a user
// POST /api/login
export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    console.log("Authentication successful!");
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user.name),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials.");
  }
});

// Get user data
// POST /api/users/me
// Private
export const getMe = expressAsyncHandler(async (req: any, res) => {
  console.log("getMe user:", req.user);
  res.status(200).json(req.user);
});
