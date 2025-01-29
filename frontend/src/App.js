import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Component/Home';
import Header from './Component/Layout/Header';
import AboutUs from './Component/User/AboutUs';
import Testimonials from './Component/User/Testimonials';
import Login from './Component/User/Login';
import Registration from './Component/User/Registration';

// import AdminHeader from './Component/Admin/AdminHeader';
// import AdminSidebar from './Component/Admin/AdminSidebar';
// import Dashboard from './Component/Admin/Dashboard';
// import WaterCollection from './Component/Admin/WaterCollection';
// import WaterSupply from './Component/Admin/WaterSupply';
// import WaterFiltration from './Component/Admin/WaterFiltration';
// import WaterDrain from './Component/Admin/WaterDrain';
// import FishFeeding from './Component/Admin/FishFeeding';
// import SolarPanel from './Component/Admin/SolarPanel';
// import UserManagement from './Component/Admin/UserManagement';
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
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />

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

        {/* Admin Layout */}
        {/* <Routes>
          <Route
            path="/admin/*"
            element={
              <div style={{ display: 'flex' }}>
                <AdminSidebar />
                <div style={{ marginLeft: '250px', width: '100%' }}>
                
                </div>
              </div>
            }
          />
        </Routes> */}
      </div>
    </Router>
  );
}

export default App;
