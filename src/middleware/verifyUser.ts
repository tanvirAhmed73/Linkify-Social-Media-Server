import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../model/userSchema";

const verifyUser: RequestHandler = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) {
    res.status(401).json({ message: "Unauthorized", success: false });
    return;
  }

  try {
    const decode = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string
    ) as JwtPayload & { userID: string };

    const user = await User.findById(decode.userID);
    if (!user) {
      res.status(401).json({
        message: "Unauthorized",
        success: false,
        shouldReLogin: true,
      });
      return;
    }

    req.user = user;
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "TokenExpiredError" && refreshToken) {
        try {
          const decodeToken = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET as string
          ) as JwtPayload & { userID: string };
          console.log("decodeToken", decodeToken);
          const user = await User.findById(decodeToken.userID);
          console.log("user", user);
          if (!user) {
            res.status(401).json({
              message: "Unauthorized",
              success: false,
              shouldReLogin: true,
            });
            return;
          }

          const newAccessToken = jwt.sign(
            { userID: user._id },
            process.env.JWT_ACCESS_SECRET as string,
            {
              expiresIn: "15m",
            }
          );

          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
          });

          req.user = user;

          next();
        } catch (error) {
          res.status(401).json({ message: "Session expired" });
          return;
        }
      }
    }

    res.status(401).json({ message: "Session expired" });
    return;
  }
};

export default verifyUser;
