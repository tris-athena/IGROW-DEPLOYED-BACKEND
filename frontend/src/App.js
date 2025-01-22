import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';  // Make sure this path is correct
import Header from './Component/Layout/Header';  // Ensure path is correct
import AboutUs from './Component/User/AboutUs';  // Ensure path is correct
import Testimonials from './Component/User/Testimonials';  // Ensure path is correct
import Login from './Component/User/Login';  // Correct import for Login
import Registration from './Component/User/Registration';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/login" element={<Login />} />  {/* Correct path for Login */}
            <Route path="/registration" element={<Registration />} />  
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
