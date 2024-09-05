import React from "react";
import { Link } from "react-router-dom";
import "./styles/GetStarted.css"; // Create this CSS file for styling

const GetStarted = () => {
  return (
    <div className="get-started-container">
      <h1 className="display-4">Get Started</h1>
      <p className="lead">
        Welcome to Task Manager! Follow the steps below to get started:
      </p>
      <div className="steps">
        <div className="step">
          <h2>1. Register</h2>
          <p>Create an account to start managing your tasks.</p>
          <Link to="/register" className="btn btn-primary">
            Register
          </Link>
        </div>
        <div className="step">
          <h2>2. Login</h2>
          <p>Log in to access your task management dashboard.</p>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
        <div className="step">
          <h2>3. Start Adding Tasks</h2>
          <p>Once logged in, you can start adding and managing your tasks.</p>
          <Link to="/tasks" className="btn btn-primary">
            View Tasks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
