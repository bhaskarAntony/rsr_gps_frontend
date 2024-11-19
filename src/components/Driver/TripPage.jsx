import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { startTrip, updateTripStatus } from "../../utils/api";
import { Button, Typography, TextField, Drawer, Box } from "@mui/material";
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import axios from "axios";
import'./style.css'
import AuthContext from "../context/AuthContext";
import Loading from "../loading/Loading";


const TripPage = () => {
  const { routeId} = useParams();
  const [loading, setLoading] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isMapCompressed, setIsMapCompressed] = useState(true); // Map compression state

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setIsMapCompressed(!isMapCompressed); // Toggle map compression when drawer state changes
  };
  const [tripStatus, setTripStatus] = useState("not-started");
  const [locationLink, setLocationLink] = useState("");
  const {user} = useContext(AuthContext)
  // const driverdata = JSON.parse(localStorage.getItem("driver")) || {};
  const driverId = user?._id;
  const startedTripId = user?.startedTripId;
  const navigation = useNavigate();


  useEffect(() => {
    const fetchTripData = async () => {
      if (user?.isIntrip) {
        setLoading(true)
        try {
          const response = await axios.get(`http://localhost:4000/api/driver/trip/list/${startedTripId}`);
          console.log("Fetched Trip Data:", response.data);
          setLoading(false)
          setTripStatus(response.data?.data?.status || "not-started");
        } catch (error) {
          setLoading(false)
          console.error("Error fetching trip data:", error);
          alert('something went wrong..')
        }
      }
    };
  
    fetchTripData();
  }, [routeId, driverId, startedTripId, navigation]); // Include all dependencies
  
  const handleStartTrip = async () => {
    setLoading(true)
    try {
      // Get high-accuracy location
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
  
          const data = {
            driverId: driverId,
            route: routeId,
            liveLocationLink: locationLink,
            startLocation: { latitude, longitude }, // Send current location
          };
  
          const response = await axios.post(`http://localhost:4000/api/driver/start`, data);
          console.log("Trip started:", response.data);
          setLoading(false)
          localStorage.setItem('driver', JSON.stringify({ driver: response.data.driver }));
          setTripStatus("in_progress");
        },
        (error) => {
          setLoading(false)
          console.error("Geolocation error:", error);
          alert("Failed to fetch location. Please ensure location services are enabled.");
        },
        { enableHighAccuracy: true }
      );
    } catch (error) {
      setLoading(false)
      alert(error.response?.data?.message || "Failed to start trip.");
    }
  };
  

  const handlePauseTrip = async () => {
    try {
        const responce = await axios.patch(`http://localhost:4000/api/driver/${driverId}/status`, {status:'paused'})
        console.log(responce);
        setTripStatus("paused");
        
    } catch (error) {
        console.log(error);
        
    }

  };

  const handleEndTrip = async () => {
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const data = {
         status:'completed',
         endLocation: { latitude, longitude }, 
        };
        try {
          const responce = await axios.patch(`http://localhost:4000/api/driver/${driverId}/status`, data)
          console.log(responce);
          setLoading(false)
          setTripStatus("completed");
          localStorage.setItem('driver', JSON.stringify({driver:responce.data.driver}))
      } catch (error) {
        setLoading(false)
          console.log(error);
          
      }
      });
   
  };

  const handleResumetrip = async()=>{
    try {
        const responce = await axios.patch(`http://localhost:4000/api/driver/${driverId}/status`, {status:'in_progress'})
        console.log(responce);
        setTripStatus("in_progress");
    } catch (error) {
        console.log(error);
        
    }
  }
  if(loading){
    return <Loading/>
  }

  return (
    <div className="bg-light ">
      {tripStatus === "not-started" && (
        // <>
        //   <TextField
        //     label="Google Maps Live Location Link"
        //     fullWidth
        //     value={locationLink}
        //     onChange={(e) => setLocationLink(e.target.value)}
        //   />
        //   <Button variant="contained" color="primary" onClick={handleStartTrip} className="mt-3">
        //     Start Trip
        //   </Button>
        // </>
     <div className="container-fluid p-3 bg-light  p-md-5">
         <div className="row mt-3">
          <div className="col-md-5 m-auto">
            <div className="link-form p-3 shadow  rounded py-4">
              <h1 className="fs-3">Google live location</h1>
              <p className="fs-6">fill the google live location link to continue.</p>
              <div className="mt-3 mb-4">
              <input type="text" className="form-control p-3 bg-light" value={locationLink} onChange={(e)=>setLocationLink(e.target.value)} />
              <button className="btn-main w-100 rounded-pill p-3" onClick={handleStartTrip}>Start trip</button>
              </div>
            </div>
          </div>
        </div>
     </div>
      )}
     {tripStatus === "in_progress" && (

       <div className="container-fluid p-3 p-md-5 tracking-main">

                <div className="row" >
                  <div className="col-md-5 m-auto">
                      <div className="tracking">
                      <div className="trip-tracking">
                    <img src="https://i.pinimg.com/originals/b6/6e/14/b66e14f44dd38a6fac2aff3207345058.gif" alt="" className="w-100" />
                    <h1 className="fs-3 text-center">Your Trip Has been Tracking, Safe Ride</h1>
                    <p className="fs-6 text-center">tracking your trip don't turn off your gps or location in your device.</p>
                      </div>
                      <div className="details mt-3">
                    <button className="btn btn-danger p-3 rounded-pill w-100" onClick={handleEndTrip}>End Trip</button>
                    </div>
                      </div>
                  </div>
                </div>



       </div>
      )}

{tripStatus === "paused" && (
        <>
          <Button variant="outlined" onClick={handleResumetrip}>
            resume
          </Button>

          <Button variant="contained" color="secondary" onClick={handleEndTrip} className="ms-2">
            End Trip
          </Button>
        </>
      )}

      {tripStatus === "completed" && (
       <div className="completed-trip container-fluid p-3 p-md-5">
          <div className="row">
            <div className="col-md-5 m-auto">
              <div className="success">
                <img src="https://gd-hbimg.huaban.com/828372bd200b2b7078fe773fc782835e60f3cd6fa2c9-3jfQPi" alt="" className="w-100" />

                <h1 className="fs-3 text-center text-white">Trip Complted successfully.</h1>
                <a className="btn btn-light rounded-pill p-3 w-100 mt-5" href="/">Take Rest</a>
              </div>
            </div>
          </div>
       </div>
      )}
    </div>
  );
};

export default TripPage;
