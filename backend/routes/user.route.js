import express from "express";

import { updatedProfile } from "../controllers/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import { upload } from "../middleware/uploadImage.js";

const router = express.Router();

router.put(
  "/about-me",
  verifyToken,
  upload.single("userImage"),
  updatedProfile
);

export default router;
