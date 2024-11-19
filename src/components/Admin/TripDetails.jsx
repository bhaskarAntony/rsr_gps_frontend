import React, { useEffect, useState } from "react";
import { fetchTrips } from "../../utils/api";
import { Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const TripList = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const getTrips = async () => {
      const { data } = await fetchTrips();
      setTrips(data);
    };
    getTrips();
  }, []);

  return (
    <div className="container mt-4">
      <Typography variant="h4" className="mb-4">
        All Trips
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Driver</TableCell>
            <TableCell>Route</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Started At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trips.map((trip) => (
            <TableRow key={trip._id}>
              <TableCell>{trip.driver.username}</TableCell>
              <TableCell>{trip.route.name}</TableCell>
              <TableCell>{trip.status}</TableCell>
              <TableCell>{new Date(trip.startedAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TripList;
