import express from "express";

import verifyToken from "../middleware/verifyToken.js";
import {
  searchStudy,
  allStudies,
  createStudy,
  getStudyById,
  getUserStudies,
  deleteStudy,
  updateStudy,
  searchByCategory,
} from "../controllers/studies.controller.js";

const router = express.Router();

router.get("/user-studies", verifyToken, getUserStudies);
router.get("/posted/:id", verifyToken, getStudyById);
router.get("/filter", verifyToken, searchByCategory);
router.get("/search", verifyToken, searchStudy);
router.get("/all", verifyToken, allStudies);

router.post("/new-study", verifyToken, createStudy);

router.put("/posted/edit/:id", verifyToken, updateStudy);

router.delete("/:id", verifyToken, deleteStudy);

export default router;
