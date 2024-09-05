// src/AboutUs.js
import React from "react";
import './styles/AboutUs.css'; // Import the CSS file

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>
        Welcome to Task Manager! We are a team dedicated to helping you manage
        your tasks efficiently. Our platform allows you to keep track of your
        tasks, add new tasks, and mark completed ones. Whether you're a busy
        professional or just need a better way to organize your personal tasks,
        we're here to help!
      </p>
      <p>
        Our mission is to provide a simple, intuitive task management tool that
        fits seamlessly into your daily routine. Thank you for choosing Task
        Manager. If you have any questions or feedback, please don't hesitate to
        <a href="mailto:support@taskmanager.com">contact us</a>.
      </p>
    </div>
  );
};

export default AboutUs;
