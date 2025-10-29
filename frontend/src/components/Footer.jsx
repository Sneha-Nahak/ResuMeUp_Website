import { Link } from "react-router-dom";
import "../styles/footer.css";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        
        {/* Column 1: Brand Info */}
        <div className="footer-section brand-info">
          <Link to="/" className="footer-logo">ResuMeUp</Link>
          <p className="tagline">Crafting your professional future, one resume at a time.</p>
          <div className="social-links">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href="mailto:support@resmeup.com"><FaEnvelope /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/builder">Resume Builder</Link></li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><Link to="/templates">Templates</Link></li>
            <li><Link to="/career-tips">Career Tips</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        {/* Column 4: Support */}
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="/privacy-&-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service">Terms of Service</Link></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ResuMeUp. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
