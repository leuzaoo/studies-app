import express from "express";

import verifyToken from "../middleware/verifyToken.js";

import {
  getStudyCommentsCount,
  studiesCount,
  toggleLike
} from "../controllers/metrics.controller.js";

const router = express.Router();

router.get("/:id/comments-count", getStudyCommentsCount);
router.get("/:id/studies-count", studiesCount);

router.post("/:id/like", verifyToken, toggleLike);

export default router;
