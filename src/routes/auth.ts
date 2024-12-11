import { Router } from "express";
import {
  checkAuthController,
  loginController,
  logOutAuthController,
  signUpController,
} from "../controller/authController";
import verifyUser from "../middleware/verifyUser";
const router = Router();

router.post("/register", signUpController);
router.post("/login", loginController);
router.get("/check-auth", verifyUser, checkAuthController);
router.get("/log-out", verifyUser, logOutAuthController);

export default router;
