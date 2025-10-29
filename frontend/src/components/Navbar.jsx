import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/navbar.css";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";
  const navbarClass = `navbar ${isDashboard ? "navbar-dashboard" : ""}`;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={navbarClass}>
      <div className="navbar-logo">
        <Link to="/" onClick={closeMenu}>ResuMeUp</Link>
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        {user ? (
          <>
            {/* Logged In Links */}
            <li>
              <Link to="/" onClick={closeMenu}>Home</Link>
            </li>

          {/* Resources Dropdown (Desktop Only) */}
            <li className="navbar-dropdown-container desktop-only">
              <a href="#" className="dropdown-toggle" onClick={(e) => e.preventDefault()}>
                Resources
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/templates" onClick={closeMenu} className="dropdown-item">Templates</Link>
                </li>
                <li>
                  <Link to="/career-tips" onClick={closeMenu} className="dropdown-item">Career Tips</Link>
                </li>
                <li>
                  <Link to="/blog" onClick={closeMenu} className="dropdown-item">Blog</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
            </li>
            <li>
              <Link to="/builder" onClick={closeMenu}>Resume Builder</Link>
            </li>
            <li>
              <button className="logout-btn" onClick={() => { handleLogout(); closeMenu(); }}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            {/* Logged Out Links */}
            <li>
              <Link to="/" onClick={closeMenu}>Home</Link>
            </li>
            
            {/* Resources Dropdown (Desktop Only) */}
            <li className="navbar-dropdown-container desktop-only">
              <a href="#" className="dropdown-toggle" onClick={(e) => e.preventDefault()}>
                Resources
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/templates" onClick={closeMenu} className="dropdown-item">Templates</Link>
                </li>
                <li>
                  <Link to="/career-tips" onClick={closeMenu} className="dropdown-item">Career Tips</Link>
                </li>
                <li>
                  <Link to="/blog" onClick={closeMenu} className="dropdown-item">Blog</Link>
                </li>
              </ul>
            </li>
            
            {/* Direct Links for Mobile Menu (Mobile Only) */}
            <li className="mobile-only">
                <Link to="/templates" onClick={closeMenu}>Templates</Link>
            </li>
            <li className="mobile-only">
                <Link to="/career-tips" onClick={closeMenu}>Career Tips</Link>
            </li>
            <li className="mobile-only">
                <Link to="/blog" onClick={closeMenu}>Blog</Link>
            </li>

            <li>
              <Link to="/login" onClick={closeMenu}>Login</Link>
            </li>
            <li>
              <Link to="/register" onClick={closeMenu} className="register-btn">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
