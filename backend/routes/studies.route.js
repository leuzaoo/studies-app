import express from "express";

import { searchStudy, allStudies } from "../controllers/studies.controller.js";

const router = express.Router();

router.get("/all", allStudies);
router.get("/search", searchStudy);

export default router;
