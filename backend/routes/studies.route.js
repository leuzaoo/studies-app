import express from "express";

import { searchStudy } from "../controllers/studies.controller.js";

const router = express.Router();

router.get("/search", searchStudy);

export default router;
