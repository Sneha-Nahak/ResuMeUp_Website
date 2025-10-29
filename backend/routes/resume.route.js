const express = require('express');

const {
  saveResume,
  getResume,
  deleteResume,
} = require("../controllers/resume.controller")
const { protect } = require("../middleware/authMiddleware");
const resumeRouter = express.Router();

resumeRouter.route("/")
  .post(protect, saveResume)
  .put(protect, saveResume)
  .get(protect, getResume)
  .delete(protect, deleteResume);

module.exports = resumeRouter;