import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { registerDriver } from "../../utils/api";

const DriverRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    routes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const routes = formData.routes.split(","); // Convert routes to array
      await registerDriver({ ...formData, routes });
      alert("Driver registered successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="container mt-4">
      <Typography variant="h4" className="mb-3">
        Driver Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          fullWidth
          required
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <TextField
          label="Phone"
          name="phone"
          fullWidth
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <TextField
          label="Routes (Comma-separated)"
          name="routes"
          fullWidth
          required
          value={formData.routes}
          onChange={(e) => setFormData({ ...formData, routes: e.target.value })}
        />
        <Button variant="contained" color="primary" type="submit" className="mt-3">
          Register
        </Button>
      </form>
    </div>
  );
};

export default DriverRegister;
