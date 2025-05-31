import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './Component/Home';
import Header from './Component/Layout/Header';
import AboutUs from './Component/User/AboutUs';
import Testimonials from './Component/User/Testimonials';
import Registration from './Component/User/Registration';
import Profile from './Component/User/Profile';
import Password from './Component/User/Password';
import Landing from './Component/User/Landing';
import Sidebar from './Component/Layout/Sidebar';
import Dashboard from './Component/Admin/Dashboard';
import { ToastContainer } from 'react-toastify';
import FishFeeding from './Component/Admin/FishFeeding';
import SolarPanel from './Component/Admin/SolarPanel';
import UserManagement from './Component/Admin/UserManagement';
import WaterCollection from './Component/Admin/WaterCollection';

import WaterFiltration from './Component/Admin/WaterFiltration';
import WaterSupply from './Component/Admin/WaterSupply';


import WaterTankQuality from './Component/Admin/WaterTankQuality';
import AquariumQuality from './Component/Admin/AquariumQuality';
import WaterDrain from './Component/Admin/WaterDrain';
import Environment from './Component/Admin/Environment';
import WaterCycle from './Component/Admin/WaterCycle';
import Hydroponics from './Component/Admin/Hydroponics';

import './App.css';

// PrivateRoute component written inside App.js
const PrivateRoute = ({ children, isAdmin }) => {
  const user = JSON.parse(sessionStorage.getItem('user'));

  if (!user || !isAdmin) {
    return <Navigate to="/" />; // Redirect to home if user is not an admin
  }

  return children; // Allow access to the route if user is admin
};

// Helper component to manage headers
const AppHeader = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return <Header />;
};

function App() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const isAdmin = user && user.role === 'admin'; // Assuming user object has a role property

  // Redirect admin to dashboard if already logged in
  // useEffect(() => {
  //   if (isAdmin) {
  //     // If admin is logged in, redirect to the dashboard page
  //     window.location.href = '/admin/dashboard';
  //   } else if (user && !isAdmin) {
  //     // If non-admin user is logged in, redirect to the landing page
  //     window.location.href = '/landing';
  //   }
  // }, [isAdmin, user]); // This runs when isAdmin or user changes (i.e., user logs in)

  return (
    <Router>
      <div className="App">
        <AppHeader />
      
        <main id="main-content"className="content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/password" element={<Password />} />
            <Route path="/landing" element={<Landing />} />

            {/* Admin Routes (wrapped in PrivateRoute) */}
            <Route 
              path="/admin/dashboard" 
              element={
                <PrivateRoute isAdmin={isAdmin}>
                  <div className="admin-layout">
                    <Sidebar />
                    <Dashboard />
                  </div>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/water-collection" 
              element={
                <PrivateRoute isAdmin={isAdmin}>
                  <WaterCollection />
                </PrivateRoute>
              } 
            />

            <Route 
              path="/admin/water-tank-quality" 
              element={
                <PrivateRoute isAdmin={isAdmin}>
                  <WaterTankQuality />
                </PrivateRoute>
              } 
            />

            <Route 
              path="/admin/aquarium-quality" 
              element={
                <PrivateRoute isAdmin={isAdmin}>
                  <AquariumQuality />
                </PrivateRoute>
              } 
            />

            <Route 
              path="/admin/water-drain" 
              element={
                <PrivateRoute isAdmin={isAdmin}>
                  <WaterDrain />
                </PrivateRoute>
              } 
            />

            <Route 
              path="/admin/environment" 
              element={
                <PrivateRoute isAdmin={isAdmin}>
                  <Environment />
                </PrivateRoute>
              } 
            />

            <Route 
              path="/admin/water-cycle" 
              element={
                <PrivateRoute isAdmin={isAdmin}>
                  <WaterCycle />
                </PrivateRoute>
              } 
            />

            <Route 
              path="/admin/hydroponics" 
              element={
                <PrivateRoute isAdmin={isAdmin}>
                  <Hydroponics />
                </PrivateRoute>
              } 
            />

            <Route 
              path="/admin/water-supply" 
              element={
                <PrivateRoute isAdmin={isAdmin}>
                  <WaterSupply />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/water-filtration" 
              element={
                <PrivateRoute isAdmin={isAdmin}>
                  <WaterFiltration />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/admin/fish-feeding" 
              element={
                <PrivateRoute isAdmin={isAdmin}>
                  <FishFeeding />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/solar-panel" 
              element={
                <PrivateRoute isAdmin={isAdmin}>
                  <SolarPanel />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/user-management" 
              element={
                <PrivateRoute isAdmin={isAdmin}>
                  <UserManagement />
                </PrivateRoute>
              } 
            />
          </Routes>
        </main>

        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
