import { createContext, useState } from "react";

export const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  // ----- PERSONAL INFO -----
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
  });

  // ----- EDUCATION -----
  const [education, setEducation] = useState([
    { school: "", degree: "", year: "" },
  ]);

  const addEducation = () =>
    setEducation([...education, { school: "", degree: "", year: "" }]);
  const removeEducation = (index) =>
    setEducation(education.filter((_, i) => i !== index));

  // ----- EXPERIENCE -----
  const [experience, setExperience] = useState([
    { company: "", position: "", duration: "", description: "" },
  ]);

  const addExperience = () =>
    setExperience([
      ...experience,
      { company: "", position: "", duration: "", description: "" },
    ]);
  const removeExperience = (index) =>
    setExperience(experience.filter((_, i) => i !== index));

  // ----- PROJECTS -----
  const [projects, setProjects] = useState([
    { title: "", description: "", githubLink: "", liveLink: "", otherLink: "" },
  ]);

  const addProject = () =>
    setProjects([
      ...projects,
      { title: "", description: "", githubLink: "", liveLink: "", otherLink: "" },
    ]);
  const removeProject = (index) =>
    setProjects(projects.filter((_, i) => i !== index));

  // ----- SKILLS -----
  const [skills, setSkills] = useState([""]);

  const addSkill = () => setSkills([...skills, ""]);
  const removeSkill = (index) => setSkills(skills.filter((_, i) => i !== index));

  return (
    <ResumeContext.Provider
      value={{
        personalInfo,
        setPersonalInfo,

        education,
        setEducation,
        addEducation,
        removeEducation,

        experience,
        setExperience,
        addExperience,
        removeExperience,

        projects,
        setProjects,
        addProject,
        removeProject,

        skills,
        setSkills,
        addSkill,
        removeSkill,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
