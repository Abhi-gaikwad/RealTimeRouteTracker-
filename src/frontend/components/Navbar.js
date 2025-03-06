import React, { useState } from 'react';
import './navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>TravelSafe</h1>
      </div>
      <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
        <a href="#welcome">Welcome</a>
        <a href="#maproutes">Map Routes</a>
        <a href="#safetyinsights">Safety Insights</a>
        <a href="#features">Features</a>
        <a href="#about">About</a>
        <a href="#footer">Footer</a>
      </div>
      <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={handleMenuToggle}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;