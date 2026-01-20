import express from "express";

import {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router
  .route("/")
  .get(protect, getApplications)
  .post(protect, createApplication);

router
  .route("/:id")
  .put(protect, updateApplication)
  .delete(protect, deleteApplication);

export default router;
