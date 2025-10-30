import { useContext, useRef, useCallback, useEffect, useState } from "react";
import { ResumeContext } from "../context/ResumeContext";
import { useReactToPrint } from "react-to-print"; 
import "../styles/resume.css";

const BACKEND_SAVE_URL = import.meta.env.VITE_BACKEND_API_URL; 
const BACKEND_FETCH_URL = BACKEND_SAVE_URL ? BACKEND_SAVE_URL.replace('/save', '/fetch') : ''; 

const ResumeBuilder = () => {
  const {
    personalInfo, setPersonalInfo,
    education, setEducation, addEducation, removeEducation,
    experience, setExperience, addExperience, removeExperience,
    projects, setProjects, addProject, removeProject,
    skills, setSkills, addSkill, removeSkill,
  } = useContext(ResumeContext);

  const resumeRef = useRef(null); 
  const [hasPreviousData, setHasPreviousData] = useState(false); 

  const fetchResumeData = useCallback(async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    if(!BACKEND_FETCH_URL){
      console.error("Backend FETCH URL is not defined.");
      return;
    }

    try {
      const response = await fetch(BACKEND_FETCH_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data && data.resumeData) {
          const fetchedData = data.resumeData;

          setPersonalInfo(fetchedData.personalInfo || {});
          setEducation(fetchedData.education || []);
          setExperience(fetchedData.experience || []);
          setProjects(fetchedData.projects || []);
          setSkills(fetchedData.skills || []);

          setHasPreviousData(true); 
          console.log("Resume data loaded successfully!");
        } else {
          setHasPreviousData(false);
          alert("There is no previous data recorded from this user.");
        }
      } else if (response.status === 404) {
        setHasPreviousData(false);
        alert("There is no previous data recorded from this user.");
      } else if (response.status === 401) {
        console.error("Authentication failed during fetch.");
      } else {
        console.error("Failed to fetch resume data:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error connecting to backend for fetch:", error);
    }
  }, [setPersonalInfo, setEducation, setExperience, setProjects, setSkills]); 

  useEffect(() => {
    fetchResumeData();
  }, [fetchResumeData]);

  const saveToBackend = useCallback(async () => {
    
    if(!BACKEND_SAVE_URL){
      console.error("Backend URL is not defined in the environment variables.");
      alert("Configuration Error: Backend save path is missing.");
      return false;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      alert("You must be logged in to save your resume.");
      return false;
    }

    const resumeData = {
      personalInfo,
      education,
      experience,
      projects,
      skills,
    };

    const method = hasPreviousData ? 'PUT' : 'POST'; 
    const url = BACKEND_SAVE_URL; 

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(resumeData),
      });

      if (response.ok) {
        setHasPreviousData(true); 
        console.log(`Resume data ${method === 'PUT' ? 'updated' : 'saved'} successfully!`);
        alert("Progress saved successfully!");
        return true;
      } else if (response.status === 401 || response.status === 403) {
        alert("Authentication failed. Please log in again.");
        return false;
      } else {
        console.error("Failed to save resume data:", response.status, response.statusText);
        alert("Error saving resume data. Please check the console.");
        return false;
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("Network error while saving. Please try again.");
      return false;
    }
  }, [personalInfo, education, experience, projects, skills, hasPreviousData]); 

  const triggerPrint = useReactToPrint({
    contentRef: resumeRef, 
    documentTitle: "My_Resume",
    pageStyle: "@page { size: A4; margin: 10mm; } @media print { body { -webkit-print-color-adjust: exact; } }",
  });
  
  const handleSaveAndPrint = async () => {
    const saveSuccess = await saveToBackend();
    
    if (saveSuccess && triggerPrint) {
      triggerPrint(); 
    }
  };
  
  const updateEducationField = (index, field, value) => {
    const copy = [...education];
    copy[index] = { ...copy[index], [field]: value };
    setEducation(copy);
  };

  const updateExperienceField = (index, field, value) => {
    const copy = [...experience];
    copy[index] = { ...copy[index], [field]: value };
    setExperience(copy);
  };

  const updateProjectField = (index, field, value) => {
    const copy = [...projects];
    copy[index] = { ...copy[index], [field]: value };
    setProjects(copy);
  };

  const updateSkill = (index, value) => {
    const copy = [...skills];
    copy[index] = value;
    setSkills(copy);
  };

  return (
    <div className="resume-builder-container">
      <h2>Resume Builder</h2>

      <section>
        <h3>Personal Information</h3>
        <div className="input-group">
          <input 
            placeholder="Full Name" 
            value={personalInfo.name} 
            onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })} 
          />
          <input 
            placeholder="Email" 
            value={personalInfo.email} 
            onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })} 
          />
          <input 
            placeholder="Phone" 
            value={personalInfo.phone} 
            onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })} 
          />
          <input 
            placeholder="Address / Location" 
            value={personalInfo.address} 
            onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })} 
          />
          <input 
            placeholder="LinkedIn Link" 
            value={personalInfo.linkedinLink || ''} 
            onChange={(e) => setPersonalInfo({ ...personalInfo, linkedinLink: e.target.value })} 
          />
          <input 
            placeholder="GitHub Link" 
            value={personalInfo.githubLink || ''} 
            onChange={(e) => setPersonalInfo({ ...personalInfo, githubLink: e.target.value })} 
          />
          <textarea 
            placeholder="Professional Summary" 
            value={personalInfo.summary} 
            onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })} 
          />
        </div>
      </section>

      <section>
        <h3>Education</h3>
        {education.map((edu, i) => (
          <div key={i} className="input-group">
            <input placeholder="School" value={edu.school} onChange={(e) => updateEducationField(i, "school", e.target.value)} />
            <input placeholder="Degree" value={edu.degree} onChange={(e) => updateEducationField(i, "degree", e.target.value)} />
            <input 
              type="month"
              placeholder="Start Month/Year" 
              value={edu.startYear || ''} 
              onChange={(e) => updateEducationField(i, "startYear", e.target.value)} 
            />
            <input 
              type="month"
              placeholder="End Month/Year" 
              value={edu.endYear || ''} 
              onChange={(e) => updateEducationField(i, "endYear", e.target.value)} 
            />
            <button className="delete-btn" onClick={() => removeEducation(i)}>Delete</button>
          </div>
        ))}
        <button className="add-btn" onClick={addEducation}>Add Education</button>
      </section>

      <section>
        <h3>Experience</h3>
        {experience.map((exp, i) => (
          <div key={i} className="input-group">
            <input placeholder="Company" value={exp.company} onChange={(e) => updateExperienceField(i, "company", e.target.value)} />
            <input placeholder="Position" value={exp.position} onChange={(e) => updateExperienceField(i, "position", e.target.value)} />
            <input 
              placeholder="Duration (e.g., 2020-01-01 to Present)" 
              value={exp.duration} 
              onChange={(e) => updateExperienceField(i, "duration", e.target.value)} 
            />
            <textarea placeholder="Description" value={exp.description} onChange={(e) => updateExperienceField(i, "description", e.target.value)} />
            <button className="delete-btn" onClick={() => removeExperience(i)}>Delete</button>
          </div>
        ))}
        <button className="add-btn" onClick={addExperience}>Add Experience</button>
      </section>

      <section>
        <h3>Skills</h3>
        {skills.map((skill, i) => (
          <div key={i} className="input-group">
            <input placeholder="Skill" value={skill} onChange={(e) => updateSkill(i, e.target.value)} />
            <button className="delete-btn" onClick={() => removeSkill(i)}>Delete</button>
          </div>
        ))}
        <button className="add-btn" onClick={addSkill}>Add Skill</button>
      </section>

      <section>
        <h3>Projects</h3>
        {projects.map((proj, i) => (
          <div key={i} className="input-group">
            <input placeholder="Project Title" value={proj.title} onChange={(e) => updateProjectField(i, "title", e.target.value)} />
            <textarea placeholder="Description" value={proj.description} onChange={(e) => updateProjectField(i, "description", e.target.value)} />
            <input placeholder="GitHub Link" value={proj.githubLink} onChange={(e) => updateProjectField(i, "githubLink", e.target.value)} />
            <input placeholder="Live Link" value={proj.liveLink} onChange={(e) => updateProjectField(i, "liveLink", e.target.value)} />
            <input placeholder="Other/Social Link (optional)" value={proj.otherLink} onChange={(e) => updateProjectField(i, "otherLink", e.target.value)} />
            <button className="delete-btn" onClick={() => removeProject(i)}>Delete</button>
          </div>
        ))}
        <button className="add-btn" onClick={addProject}>Add Project</button>
      </section>

      <hr />

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button 
            className="pdf-btn" 
            style={{ backgroundColor: '#28a745' }} 
            onClick={saveToBackend}
          >
            Save
          </button>
          
          <button 
            className="pdf-btn"
            onClick={handleSaveAndPrint}
          >
            Download
          </button>
      </div>

      <div id="resume-preview" className="resume-preview" ref={resumeRef}>
        <h2>{personalInfo.name || "My Resume"}</h2>

        <p className="contact-line">
            {personalInfo.phone && `Phone: ${personalInfo.phone}`}
            
            {(personalInfo.email && personalInfo.phone) && " | "}
            {personalInfo.email && 
                <a href={`mailto:${personalInfo.email}`}>{`Email: ${personalInfo.email}`}</a>
            }

            {(personalInfo.githubLink && (personalInfo.email || personalInfo.phone)) && " | "}
            {personalInfo.githubLink && 
                <a 
                    href={`${personalInfo.githubLink}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    {`Github:${personalInfo.githubLink}`}
                </a>
            }

            {(personalInfo.linkedinLink && (personalInfo.email || personalInfo.phone || personalInfo.githubLink)) && " | "}
            {personalInfo.linkedinLink && 
                <a 
                    href={`${personalInfo.linkedinLink}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    {`Linkedin:${personalInfo.linkedinLink}`}
                </a>
            }
        </p>
        
        <p className="address-line">{personalInfo.address}</p>

        <p className="summary-line"><em>{personalInfo.summary}</em></p>

        <section>
          <h3>Education</h3>
          <ul>
            {education.map((edu, i) => (
              <li key={i}>
                <strong> {edu.school || "School"}</strong> – {edu.degree || "Degree"} 
                {((edu.startYear || edu.endYear) && " (") || ""}
                {edu.startYear}
                {(edu.startYear && edu.endYear && " - ") || ""}
                {edu.endYear || ""}
                {((edu.startYear || edu.endYear) && ")") || ""}
              </li>
            ))}
          </ul>
        </section>

        {/* --- START OF CORRECTED EXPERIENCE SECTION --- */}
        <section>
          <h3>Experience</h3>
          <ul>
            {experience.map((exp, i) => (
              <li key={i} style={{ marginBottom: '15px' }}>
                
                {/* Job Title/Company/Duration (Outer block) */}
                <strong> {exp.company || "Company"} </strong> – {exp.position || "Position"} ({exp.duration || "Duration"})
                
                {/* Description (Inner Bulleted List) */}
                {exp.description && (
                  <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
                    {exp.description.split('\n').map((line, lineIndex) => (
                      line.trim() && ( // Only render non-empty lines
                        <li key={lineIndex} style={{ listStyleType: 'disc' }}>
                          {line.trim()} 
                        </li>
                      )
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
        {/* --- END OF CORRECTED EXPERIENCE SECTION --- */}

        <section>
          <h3>Skills</h3>
          <ul className="skill-list">
            {skills.length > 0
              ? skills.map((s, i) => <li key={i}>{s}</li>)
              : <li>No skills added yet</li>}
          </ul>
        </section>

        {/* --- CORRECTED PROJECTS SECTION --- */}
        <section>
          <h3>Projects</h3>
          <ul>
            {projects.map((proj, i) => (
              <li key={i} style={{ marginBottom: '15px' }}>
                
                {/* Project Title */}
                <strong>{proj.title || "Project Title"}</strong> 
                
                {/* Link Line */}
                <p style={{ margin: '5px 0 5px', fontSize: '0.9em' }}>
                  {proj.githubLink && (
                    <a href={proj.githubLink} target="_blank" rel="noreferrer"> <strong>GitHub</strong></a>
                  )}
                  {proj.liveLink && (
                    <>
                      {" | "}
                      <a href={proj.liveLink} target="_blank" rel="noreferrer"> <strong>Live</strong></a>
                    </>
                  )}
                  {proj.otherLink && (
                    <>
                      {" | "}
                      <a href={proj.otherLink} target="_blank" rel="noreferrer"> <strong>Other</strong> </a>
                    </>
                  )}
                </p>
                
                {proj.description && (
                  <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
                    {proj.description.split('\n').map((line, lineIndex) => (
                      line.trim() && ( // Only render non-empty lines
                        <li key={lineIndex} style={{ listStyleType: 'disc' }}>
                          {line.trim()} 
                        </li>
                      )
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ResumeBuilder;