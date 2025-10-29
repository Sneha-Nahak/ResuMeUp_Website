import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/dashboard.css";

const Dashboard = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      
      <div className="dashboard-header-card"> 
        <div className="welcome-card">
          <h2>Welcome back, {user?.name || "User"} 👋</h2>
          <p>
            Start crafting your professional journey — create, edit, and
            download your resume with ease.
          </p>
        </div>

        <div className="dashboard-actions">
          <div
            className="dashboard-card"
            onClick={() => navigate("/builder")}
          >
            <h3>🧾 Resume Builder</h3>
            <p>Create or update your professional resume.</p>
          </div>

          <div className="dashboard-card logout-card" onClick={handleLogout}>
            <h3>🚪 Logout</h3>
            <p>Securely log out of your account.</p>
          </div>
        </div>
      </div>
      
      <section className="services-section">
        <h2 className="section-title">Build a Professional Resume, Section by Section</h2>
        <p className="section-subtitle">
          ResuMeUp guides you through every critical part of your resume, ensuring no detail is missed.
        </p>

        <div className="service-cards-grid">
          <div className="service-card">
            <h4>👤 Personal Information</h4>
            <p>Capture your full name, contact details, and professional links (LinkedIn, Portfolio) for easy reach.</p>
          </div>

          <div className="service-card">
            <h4>💼 Professional Experience</h4>
            <p>Detail your work history, focusing on achievements and quantifiable results over just duties.</p>
          </div>

          <div className="service-card">
            <h4>💡 Projects & Portfolio</h4>
            <p>Showcase personal and professional projects, demonstrating your practical skills and initiative.</p>
          </div>

          <div className="service-card">
            <h4>🎓 Education & Certifications</h4>
            <p>List your academic background, degrees, and relevant professional certifications.</p>
          </div>
          
          <div className="service-card">
            <h4>🛠️ Technical Skills</h4>
            <p>Categorize and highlight your key technical proficiencies, languages, and tools.</p>
          </div>
          
          <div className="service-card">
            <h4>📝 Summary & Objective</h4>
            <p>Craft a compelling, tailored opening statement to hook recruiters in the first 6 seconds.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
