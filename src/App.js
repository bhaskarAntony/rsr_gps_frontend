import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DriverRegister from "./components/Driver/DriverRegister";
import DriverLogin from "./components/Driver/DriverLogin";
import TripPage from "./components/Driver/TripPage";
import AdminDashboard from "./components/Admin/AdminDashboard";
import DriverList from "./components/Admin/DriverList";
import TripList from "./components/Admin/TripDetails";
import DriverDashboard from "./components/Driver/DriverDashboard";
import './App.css'
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const App = () => {
  return (
    <Router>
      <header className="bg-light p-3 border-bottom shadow-sm">
        <h1 className="fs-4">RSR Tours & Travels</h1>
      </header>
      <Routes>
        {/* Driver Pages */}
       
        <Route path="/login" element={<DriverLogin />} />
        <Route path="/driver/register" element={<DriverRegister />} />

        <Route path="/" element={<PrivateRoute><DriverDashboard /></PrivateRoute>}>
          <Route path="/driver/trip/:routeId/:driverId" element={<PrivateRoute><TripPage /></PrivateRoute>} />
          <Route path="/*" element={<h1>Not found</h1>} />
        </Route>

        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/drivers" element={<DriverList />} />
        <Route path="/admin/trips" element={<TripList />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
