import express from "express";

import verifyToken from "../middleware/verifyToken.js";
import { upload } from "../middleware/uploadImage.js";
import {
  updatedProfile,
  getUserByUsername,
  studiesCount,
} from "../controllers/user.controller.js";

const router = express.Router();

router.put(
  "/settings",
  verifyToken,
  upload.single("userImage"),
  updatedProfile
);

router.get("/:username", getUserByUsername);
router.get("/:userId/studies-count", studiesCount);

export default router;
