import express from "express";

import verifyToken from "../middleware/verifyToken.js";
import {
  searchStudy,
  allStudies,
  createStudy,
  getStudyById,
} from "../controllers/studies.controller.js";

const router = express.Router();

router.get("/search", verifyToken, searchStudy);
router.get("/posted/:id", verifyToken, getStudyById);
router.get("/all", verifyToken, allStudies);

router.post("/new-study", verifyToken, createStudy);

export default router;
