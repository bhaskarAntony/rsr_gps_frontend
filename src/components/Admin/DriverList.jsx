import React, { useEffect, useState } from "react";
import { fetchDrivers } from "../../utils/api";
import { Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const getDrivers = async () => {
      const { data } = await fetchDrivers();
      setDrivers(data);
    };
    getDrivers();
  }, []);

  return (
    <div className="container mt-4">
      <Typography variant="h4" className="mb-4">
        Registered Drivers
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Routes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drivers.map((driver) => (
            <TableRow key={driver._id}>
              <TableCell>{driver.username}</TableCell>
              <TableCell>{driver.email}</TableCell>
              <TableCell>{driver.phone}</TableCell>
              <TableCell>{driver.routes.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DriverList;
