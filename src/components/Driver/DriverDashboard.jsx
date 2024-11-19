import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { Skeleton } from "@mui/material";
import "./style.css";

const DriverDashboard = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Navigate to active trip if the user is already on a trip
  useEffect(() => {
    if (user?.isIntrip) {
      navigate(`/driver/trip/${user.startedRoute}/${user._id}`);
    }
  }, [user, navigate]);

  // Fetch routes data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/driver/${user?._id}/routes`);
        setRoutes(response.data);
      } catch (error) {
        console.error("Failed to fetch routes:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <div className="container-fluid p-3 p-md-5">
      {/* Dashboard Summary */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="top-card d-flex align-items-center gap-2 p-3 text-light rounded shadow bg-dark">
            <i className="bi bi-car-front-fill display-2"></i>
            <div>
              <p className="fs-6 mb-0">Total Trips</p>
              <h1 className="fs-2 fw-bold">{user?.myTrips?.length}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Routes List */}
      <div className="row mt-4">
        {loading
          ? Array.from(new Array(4)).map((_, index) => ( // Render 4 Skeletons while loading
              <div key={index} className="col-md-6 mb-3">
                <div className="p-3 shadow h-100 text-light rounded">
                  <Skeleton variant="text" width="60%" height={30} />
                  <Skeleton variant="rectangular" width="100%" height={50} className="my-3" />
                  <Skeleton variant="text" width="80%" height={20} />
                  <Skeleton variant="text" width="50%" height={20} />
                  <Skeleton variant="rectangular" width="100%" height={40} className="mt-3" />
                </div>
              </div>
            ))
          : routes.routes?.map((route, index) => (
              <div key={index} className="col-md-6 mb-3">
                <div className="trip-card p-3 shadow h-100 text-light rounded">
                  <h1 className="fs-4 fw-bold">
                    {route.routeName.split(" ")[0]} <i className="bi bi-arrow-left-right"></i>{" "}
                    {route.routeName.split(" ")[2]}
                  </h1>
                  <hr />
                  <p className="fs-6">Route Employees</p>
                  <div className="employees-scroll-container d-flex gap-2 overflow-x-auto snap-x">
                    {route.employees?.map((employee, empIndex) => (
                      <div
                        key={empIndex}
                        className="employee d-flex gap-2 align-items-center mb-3 p-2 rounded-3 snap-start"
                      >
                        <div>
                          <p className="fs-5 mb-0">
                            <i className="bi bi-person-fill"></i> {employee.name}
                          </p>
                          <small className="small mt-3 d-block">
                            <i className="bi bi-geo-alt-fill"></i> {employee.startPoint}
                          </small>
                          <small className="small mt-3 d-block">
                            <i className="bi bi-geo-alt-fill"></i> {employee.endPoint}
                          </small>
                          <small className="small mt-3 d-block">
                            <i className="bi bi-telephone-fill"></i> {employee.phoneNumber}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn btn-light w-100 p-2 rounded-pill"
                    onClick={() => navigate(`/driver/trip/${route._id}/${route._id}`)}
                  >
                    Continue Trip
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default DriverDashboard;
