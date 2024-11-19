import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <Typography variant="h4" className="mb-4">
        Admin Dashboard
      </Typography>
      <div>
        <Button
          variant="contained"
          color="primary"
          className="mb-3"
          onClick={() => navigate("/admin/drivers")}
        >
          Manage Drivers
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="mb-3 ms-3"
          onClick={() => navigate("/admin/trips")}
        >
          Manage Trips
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
