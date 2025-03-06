import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import "./Signup.css";

const Signup = ({ handleLogin }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { fullName, email, password, confirmPassword } = formData;
  const navigate = useNavigate(); // Initialize useNavigate

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      try {
        const res = await axios.post('http://localhost:5000/api/users/register', { name: fullName, email, password });
        console.log(res.data);
        alert("Registration completed");
        setIsSignup(false); // Switch to login form after successful registration
      } catch (err) {
        console.error(err.response.data);
        alert("Registration failed");
      }
    } else {
      try {
        const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
        console.log(res.data);
        alert("Login successful");
        handleLogin(); // Call handleLogin to update the login state
        navigate("/"); // Redirect to the main project after successful login
      } catch (err) {
        console.error(err.response.data);
        alert("Invalid credentials");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-toggle">
          <button
            className={`toggle-btn ${isSignup ? "active" : ""}`}
            onClick={() => setIsSignup(true)}
          >
            Sign Up
          </button>
          <button
            className={`toggle-btn ${!isSignup ? "active" : ""}`}
            onClick={() => setIsSignup(false)}
          >
            Login
          </button>
        </div>

        <h2 className="auth-title">{isSignup ? "Create Account" : "Welcome Back"}</h2>
        
        <form onSubmit={onSubmit}>
          {isSignup && <input type="text" placeholder="Full Name" name="fullName" value={fullName} onChange={onChange} className="input-field" />}
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} className="input-field" />
          <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} className="input-field" />
          {isSignup && <input type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={onChange} className="input-field" />}
          
          <button type="submit" className="auth-btn">
            {isSignup ? "Sign Up" : "Login"}
          </button>

          <p className="auth-text">
            {isSignup ? "Already have an account?" : "Don't have an account?"} 
            <span onClick={() => setIsSignup(!isSignup)} className="toggle-link">
              {isSignup ? "Login" : "Sign Up"}
            </span>
          </p>
        </form>

        <div className="social-login">
          <p>Or {isSignup ? "Sign up" : "Login"} with:</p>
          <div className="social-icons">
            <i className="fab fa-google"></i>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-github"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;