const Resume = require("../models/resume.model");

const saveResume = async (req, res) => {
  try {
    const userId = req.user._id;
    const resumeData = { ...req.body, user: userId };

    let existingResume = await Resume.findOne({ user: userId });

    if (existingResume) {
      const updatedResume = await Resume.findByIdAndUpdate(
        existingResume._id,
        resumeData,
        { new: true, runValidators: true }
      );
      res.status(200).json({ 
          message: "Resume data updated successfully", 
          resumeData: updatedResume 
      });

    } else {
      const newResume = await Resume.create(resumeData);
      res.status(201).json({ 
          message: "Resume data created successfully", 
          resumeData: newResume 
      });
    }

  } catch (error) {
    res.status(500).json({ message: "Failed to save or update resume data", error: error.message });
  }
};

const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id });

    if (!resume) {
      return res.status(404).json({ message: "No previous data recorded from this user" });
    }

    res.json({ 
        message: "Resume data fetched successfully", 
        resumeData: resume 
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteResume = async (req, res) => {
    try {
        const result = await Resume.findOneAndDelete({ user: req.user._id });

        if (!result) return res.status(404).json({ message: "Resume not found for this user" });

        res.json({ message: "Resume deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { saveResume, getResume, deleteResume };