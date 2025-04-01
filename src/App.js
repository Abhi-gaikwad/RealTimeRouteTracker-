import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './styles.css';
import Welcome from './frontend/components/Welcome';
import Features from './frontend/components/Features';
import MapRoutes from './frontend/components/MapRoutes';
import SafetyInsights from './frontend/components/SafetyInsights';
import TravelRecommendations from './frontend/components/about';
import Footer from './frontend/components/Footer';
import Navbar from './frontend/components/Navbar';
import Chatbot from './frontend/components/Chatbot';
import SignIn from './frontend/components/signin';
import SignUp from './frontend/components/signup';

function App() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [userChoice, setUserChoice] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initially false
  const mapRef = useRef(null);

  const handleUserChoice = (choice) => {
    setUserChoice(choice);
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Update the state to true after successful login
  };

  return (
    <Router>
      <Routes>
        {/* Redirect to SignIn by default if not logged in */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/signin" />} />

        {/* SignIn Page */}
        <Route path="/signin" element={<SignIn handleLogin={handleLogin} />} />

        {/* SignUp Page */}
        <Route path="/signup" element={<SignUp />} />

        {/* Main App */}
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <>
                <Navbar />
                <section id="welcome">
                  <Welcome setSource={setSource} setDestination={setDestination} handleUserChoice={handleUserChoice} />
                </section>
                <section id="maproutes">
                  <div ref={mapRef}>
                    <MapRoutes source={source} destination={destination} userChoice={userChoice} />
                  </div>
                </section>
                <section id="safetyinsights">
                  <SafetyInsights />
                </section>
                <section id="about">
                  <TravelRecommendations />
                </section>
                <section id="footer">
                  <Footer />
                </section>
                <div className="chatbot-container">
                  <Chatbot open={true} />
                </div>
              </>
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
