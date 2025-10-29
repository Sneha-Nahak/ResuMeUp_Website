import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {BrowserRouter as Router} from 'react-router-dom'
import { UserProvider } from "./context/UserContext";
import { ResumeProvider } from "./context/ResumeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
    <UserProvider>
      <ResumeProvider>
        <App />
      </ResumeProvider>
    </UserProvider>
    </Router>
  </StrictMode>
);
