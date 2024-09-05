// src/Navbar.js
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./styles/Navbar.css";
import { FcTodoList } from "react-icons/fc";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  const navigate = useNavigate();
  const { isRegistered, username, setIsRegistered, setUsername } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    setIsRegistered(false);
    setUsername("");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark-custom shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <FcTodoList className="m-2 display-5" />
          <span className="logo-text text-light">Task Manager</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav me-auto">
            {!isRegistered ? (
              <>
                <Link
                  to="/get-started"
                  className={`nav-link custom-nav-link ${isActive("/get-started") ? "active" : ""}`}
                >
                  Get Started
                </Link>
                <Link
                  to="/about-us"
                  className={`nav-link custom-nav-link ${isActive("/about-us") ? "active" : ""}`}
                >
                  About Us
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/tasks"
                  className={`nav-link custom-nav-link ${isActive("/tasks") ? "active" : ""}`}
                >
                  Tasks
                </Link>
                <Link
                  to="/add-task"
                  className={`nav-link custom-nav-link ${isActive("/add-task") ? "active" : ""}`}
                >
                  Add Task
                </Link>
                <Link
                  to="/completed-tasks"
                  className={`nav-link custom-nav-link ${isActive("/completed-tasks") ? "active" : ""}`}
                >
                  Done Tasks
                </Link>
              </>
            )}
          </div>
          <div className="d-flex align-items-center">
            {!isRegistered ? (
              <Link to="/register" className="btn-custom">
                Register
              </Link>
            ) : (
              <>
                <span className="nav-link text-light me-2 mt-3">
                  Welcome, {username}
                </span>
                <button className="btn-custom me-2 mt-3" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
