import React, { useContext } from "react";
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
import AuthContext from "./components/context/AuthContext";

const App = () => {
  const {isAuthenticated, logout} = useContext(AuthContext)
  return (
    <Router>
      <header className="bg-light p-3 border-bottom shadow-sm d-flex gap-2 justify-content-between align-items-center">
        <h1 className="fs-4">RSR</h1>
       {
        isAuthenticated?( <button className="btn btn-danger" onClick={logout}>Logout</button>):(null)
       }
      </header>
      <Routes>
        {/* Driver Pages */}
       
        <Route path="/login" element={<DriverLogin />} />
        <Route path="/driver/register" element={<DriverRegister />} />
        <Route path="/" element={<PrivateRoute><DriverDashboard /></PrivateRoute>}/>
        <Route path="/*" element={<h1>Not found</h1>} />
        <Route path="/driver/trip/:routeId/:driverId" element={<PrivateRoute><TripPage /></PrivateRoute>} />

        
      </Routes>
    </Router>
  );
};

export default App;
