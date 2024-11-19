import express from "express";

import verifyToken from "../middleware/verifyToken.js";
import {
  newComment,
  getStudyComments,
} from "../controllers/comments.controller.js";

const router = express.Router();

router.get("/study/:id/comments", getStudyComments);

router.post("/study/:id/comment", verifyToken, newComment);

export default router;
