// // import React, { useState, useRef, useEffect } from 'react';
// // import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// // import './styles.css';
// // import Welcome from './frontend/components/Welcome';
// // import Features from './frontend/components/Features';
// // import MapRoutes from './frontend/components/MapRoutes';
// // import SafetyInsights from './frontend/components/SafetyInsights';
// // import TravelRecommendations from './frontend/components/TravelRecommendations';
// // import Footer from './frontend/components/Footer';
// // import Navbar from './frontend/components/navbar';
// // import AuthForm from './frontend/components/Signup';

// // function App() {
// //   const [source, setSource] = useState('');
// //   const [destination, setDestination] = useState('');
// //   const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
// //   const [isMapReady, setIsMapReady] = useState(false); // State to track if the map is ready
// //   const mapRef = useRef(null); // Reference to scroll to MapRoutes

// //   // Function to scroll to the MapRoutes component
// //   const handleShowMap = () => {
// //     if (mapRef.current) {
// //       mapRef.current.scrollIntoView({ behavior: 'smooth' });
// //     }
// //   };

// //   // Use useEffect to trigger scrolling after the map is ready
// //   useEffect(() => {
// //     if (isMapReady) {
// //       handleShowMap(); // Scroll to the map after it's ready
// //     }
// //   }, [isMapReady]);

// //   // Function to update source and destination
// //   const updateLocationsAndScroll = (startLocation, endLocation) => {
// //     setSource(startLocation);
// //     setDestination(endLocation);
// //     setIsMapReady(false); // Reset map ready state
// //   };

// //   const handleLogin = () => {
// //     setIsLoggedIn(true); // Set login status to true upon successful login
// //   };

// //   return (
// //     <Router>
// //       <div>
// //         <Routes>
// //           <Route path="/signup" element={<AuthForm handleLogin={handleLogin} />} />
// //           <Route
// //             path="/"
// //             element={
// //               isLoggedIn ? (
// //                 <>
// //                   <Navbar />
// //                   <section id="welcome">
// //                     <Welcome
// //                       setSource={setSource}
// //                       setDestination={setDestination}
// //                       handleShowMap={updateLocationsAndScroll}
// //                     />
// //                   </section>
// //                   <section id="maproutes">
// //                     {/* Map always visible */}
// //                     <div ref={mapRef}>
// //                       <MapRoutes
// //                         source={source}
// //                         destination={destination}
// //                         setIsMapReady={setIsMapReady} // Pass function to update map ready state
// //                       />.
// //                     </div>
// //                   </section>
// //                   <section id="features">
// //                     <Features />
// //                   </section>
// //                   <section id="safetyinsights">
// //                     <SafetyInsights />
// //                   </section>
// //                   <section id="travelrecommendations">
// //                     <TravelRecommendations />
// //                   </section>
// //                   <section id="footer">
// //                     <Footer />
// //                   </section>
// //                 </>
// //               ) : (
// //                 <Navigate to="/signup" replace />
// //               )
// //             }
// //           />
// //         </Routes>
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;

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

function App() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [userChoice, setUserChoice] = useState(null); // Store user choice
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const mapRef = useRef(null);

  const handleUserChoice = (choice) => {
    setUserChoice(choice); // Save user choice for MapRoutes
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
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
                <Navigate to="/signup" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


