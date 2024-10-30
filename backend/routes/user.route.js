import express from "express";

import { updatedProfile } from "../controllers/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.put("/about-me", verifyToken, updatedProfile);

export default router;
