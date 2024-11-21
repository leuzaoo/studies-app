import express from "express";

import verifyToken from "../middleware/verifyToken.js";
import { upload } from "../middleware/uploadImage.js";
import {
  updatedProfile,
  getUserByUsername,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:username", getUserByUsername);

router.put(
  "/settings",
  verifyToken,
  upload.single("userImage"),
  updatedProfile
);

export default router;
