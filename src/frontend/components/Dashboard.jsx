import React from 'react';
import Navbar from './Navbar';
import Welcome from './Welcome';
import MapRoutes from './MapRoutes';
import SafetyInsights from './SafetyInsights';
import TravelRecommendations from './about';
import Footer from './Footer';
import Chatbot from './Chatbot';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <section id="welcome">
        <Welcome />
      </section>
      <section id="maproutes">
        <MapRoutes />
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
  );
};

export default Dashboard;
