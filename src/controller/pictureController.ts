import { RequestHandler } from "express";
import User from "../model/userSchema";

const coverImageController: RequestHandler = async (req, res) => {
  const { userId, displayUrl } = req.body;
  try {
    const updateCoverPhoto = await User.findOneAndUpdate(
      { _id: userId },
      { coverPicture: displayUrl },
      { new: true }
    );
    res.status(200).json({
      message: "Cover image updated successfully",
      updateCoverPhoto,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export { coverImageController };
