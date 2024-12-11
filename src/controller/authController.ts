import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User from "../model/userSchema";

// signup
const signUpController: RequestHandler = async (req, res) => {
  try {
    const isAlreadyExist = await User.findOne({ email: req.body.email });
    if (isAlreadyExist) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    await User.create({ ...req.body, password: passwordHash });
    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//login
const loginController: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ message: "User Not Found" });
    } else {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        const userID = user._id;
        const accessToken = jwt.sign(
          { userID },
          process.env.JWT_ACCESS_SECRET as string,
          {
            expiresIn: "5h",
          }
        );
        const refreshToken = jwt.sign(
          { userID },
          process.env.JWT_REFRESH_SECRET as string,
          {
            expiresIn: "7d",
          }
        );

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
        });
        res.status(200).json({
          message: "Login Succefully!",
          success: true,
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profilePicture: user.profilePicture,
            coverPicture: user.coverPicture,
            city: user.city,
            country: user.country,
          },
        });
      } else {
        res.status(400).json({ message: "Invalid Password", success: false });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// check auth
const checkAuthController: RequestHandler = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({
      message: "Authenticated",
      success: true,
      user: {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicture,
        coverPicture: user.coverPicture,
        city: user.city,
        country: user.country,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// log out
const logOutAuthController: RequestHandler = async (req, res) => {
  if (req.cookies.accessToken) {
    res.clearCookie("accessToken");
  }
  if (req.cookies.refreshToken) {
    res.clearCookie("refreshToken");
  }
  if (req.cookies.newaccessToken) {
    res.clearCookie("newaccessToken");
  }
  res.status(200).json({ message: "Logged out successfully", success: true });
};

export {
  checkAuthController,
  loginController,
  logOutAuthController,
  signUpController,
};
