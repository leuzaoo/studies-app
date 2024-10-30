import express from "express";

import {
  searchStudy,
  allStudies,
  createStudy,
} from "../controllers/studies.controller.js";

const router = express.Router();

router.get("/all", allStudies);
router.get("/search", searchStudy);

router.post("/new-study", createStudy);

export default router;
