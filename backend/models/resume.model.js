const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    personalInfo: {
      name: String,
      email: String,
      phone: String,
      linkedinLink: String,
      githubLink: String,
      address: String,
      summary: String,
    },
    education: [
      {
        school: String,
        degree: String,
        startYear: String, 
        endYear: String,
      },
    ],
    experience: [
      {
        company: String,
        position: String,
        duration: String,
        description: String,
      },
    ],
    skills: [String],

    // projects section
    projects: [
      {
        title: String,
        description: String,
        githubLink: { type: String, default: "" },
        liveLink: { type: String, default: "" },
        otherLink: { type: String, default: "" }, // optional
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
