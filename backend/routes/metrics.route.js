import express from "express";

import {
  getStudyCommentsCount,
  studiesCount,
} from "../controllers/metrics.controller.js";

const router = express.Router();

router.get("/:id/comments-count", getStudyCommentsCount);
router.get("/:userId/studies-count", studiesCount);

export default router;
