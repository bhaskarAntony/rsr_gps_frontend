import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './style.css';
import AuthContext from "../context/AuthContext";
import Loading from "../loading/Loading";

const DriverLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  const navigate = useNavigate();
  const { login, isAuthenticated, error, clearErrors, loading } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirect to the dashboard after successful login
    }
    if (error) {
      alert(error);
      clearErrors();
    }
  }, [isAuthenticated, error, navigate, clearErrors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
   const result =  login({ email, password });
   if(result){
    navigate('/')
   }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="login bg-light">
      <div className="top"></div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5 m-auto">
            <div className="login-card p-3 py-4">
              <h1 className="fs-3">
                Welcome back, <span className="text-main">RSR Travels</span>
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <button
                  className="btn-main w-100 rounded-pill mt-3"
                  type="submit"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverLogin;
