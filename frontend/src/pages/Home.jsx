import { Link } from "react-router-dom";
import "../styles/home.css";
import image from '../assets/pexels-cottonbro-5989934.jpg'

const Home = () => {
  return (
    <div className="home-container">
      <h1>Build Your Professional Resume Effortlessly</h1>
      <p>
        Create a polished, professional resume in minutes. Save, edit, and
        download your resume with ease — no design skills required.
      </p>
      <Link to="/register">Get Started</Link>
    </div>
  );
};

export default Home;
