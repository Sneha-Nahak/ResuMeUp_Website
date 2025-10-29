import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/form.css";

const Register = () => {
  const { register } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, email, password);
    navigate("/dashboard");
  };

  return (
    <div className="form-box">
      
    <div className="auth-container">
      <h2>Create an Account</h2>
      <p className="auth-subtitle">Join ResuMeUp today</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="auth-btn">
          Register
        </button>
      </form>

      <p className="form-footer">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
    </div>
  );
};

export default Register;
