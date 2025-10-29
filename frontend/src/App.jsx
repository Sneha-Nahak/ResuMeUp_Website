import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

// New Component Imports
import Templates from "./pages/Templates";
import CareerTips from "./pages/CareerTips";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import ContactUs from "./pages/ContactUs";
import PrivacyAndPolicy from "./pages/PrivacyAndPolicy.jsx";
import TermsOfService from "./pages/TermsOfService";

function App() {
  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute> } />
        <Route path="/builder" element={<ProtectedRoute> <ResumeBuilder /></ProtectedRoute>} />
        
        {/* New Public Routes */}
        <Route path="/templates" element={<Templates />} />
        <Route path="/career-tips" element={<CareerTips />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-&-policy" element={<PrivacyAndPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
      
      <Footer/>
    </div>
  );
}

export default App;
