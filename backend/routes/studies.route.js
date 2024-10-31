import express from "express";

import verifyToken from "../middleware/verifyToken.js";
import {
  searchStudy,
  allStudies,
  createStudy,
} from "../controllers/studies.controller.js";

const router = express.Router();

router.get("/all", verifyToken, allStudies);
router.get("/search", verifyToken, searchStudy);

router.post("/new-study", verifyToken, createStudy);

export default router;
