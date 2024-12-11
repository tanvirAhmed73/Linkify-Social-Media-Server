import { Router } from "express";
import { coverImageController } from "../controller/pictureController";
import verifyUser from "../middleware/verifyUser";

const router = Router();

router.post("/coverImage", verifyUser, coverImageController);

export default router;
