import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Component/Home';
import Header from './Component/Layout/Header';
import AboutUs from './Component/User/AboutUs';
import Testimonials from './Component/User/Testimonials';
import Registration from './Component/User/Registration';
import Profile from './Component/User/Profile';  // Correct the import for Profile component
import Password from './Component/User/Password';  // Correct import for ForgotPassword
import Landing from './Component/User/Landing';  // Corrected import for Landing page
import { ToastContainer } from 'react-toastify';  // Import ToastContainer
import './App.css';

// Helper component to manage headers
const AppHeader = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin'); // Check if route is for admin

  return <Header />;
};

function App() {
  return (
    <Router>
      <div className="App">
        {/* Render appropriate header */}
        <AppHeader />

        <main className="content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/profile" element={<Profile />} /> {/* Correct route for profile */}
            <Route path="/password" element={<Password />} /> {/* Correct route for Forgot Password */}
            <Route path="/landing" element={<Landing />} /> {/* Fixed the path here */}

            {/* Admin Routes */}
            {/* <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/water-collection" element={<WaterCollection />} />
            <Route path="/admin/water-supply" element={<WaterSupply />} />
            <Route path="/admin/water-filtration" element={<WaterFiltration />} />
            <Route path="/admin/water-drain" element={<WaterDrain />} />
            <Route path="/admin/fish-feeding" element={<FishFeeding />} />
            <Route path="/admin/solar-panel" element={<SolarPanel />} />
            <Route path="/admin/user-management" element={<UserManagement />} /> */}
          </Routes>
        </main>

        {/* Add ToastContainer to enable toast notifications */}
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
