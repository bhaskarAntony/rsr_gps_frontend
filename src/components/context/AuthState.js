import React, { useEffect, useReducer } from "react";
import axios from "axios";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../../types";
import AuthContext from "./AuthContext";
import Loading from "../loading/Loading";

const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get(`https://rsr-gps-backend.onrender.com/api/driver/verify`);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(`https://rsr-gps-backend.onrender.com/api/driver/register`, formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      setAuthToken(res.data.token);
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response?.data?.message || "Registration failed",
      });
    }
  };

  // Login User
  const login = async (formData) => {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    try {//https://rsr-gps-backend.onrender.com
      const res = await axios.post(`https://rsr-gps-backend.onrender.com/api/driver/login`, formData);
      console.log(res);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      setAuthToken(res.data.token);
      loadUser();
      return true;
    } catch (err) {
      console.log(err);
      
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response?.data?.message || "Login faileds",
      });
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  if(state.loading){
    return <Loading/>
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        clearErrors,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
