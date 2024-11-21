import express from "express";

import verifyToken from "../middleware/verifyToken.js";
import {
  newComment,
  getStudyCommentsById,
  getStudyCommentsCount,
} from "../controllers/comments.controller.js";

const router = express.Router();

router.get("/:id/comments-count", getStudyCommentsCount);
router.get("/study/:id/comments", getStudyCommentsById);

router.post("/study/:id/new-comment", verifyToken, newComment);

export default router;
