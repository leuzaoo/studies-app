import express from "express";

import verifyToken from "../middleware/verifyToken.js";
import {
  newComment,
  getStudyCommentsById,
  deleteComment,
} from "../controllers/comments.controller.js";

const router = express.Router();

router.get("/study/:id/comments", getStudyCommentsById);

router.post("/study/:id/new-comment", verifyToken, newComment);

router.delete("/comment/:id", verifyToken, deleteComment);

export default router;
