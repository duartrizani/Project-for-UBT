import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ allowedRoles, children }) => {
  const isLoggedIn = localStorage.getItem("valid");
  const userRole = localStorage.getItem("role");

  // Check if the user is logged in and has the required role
  if (isLoggedIn && allowedRoles.includes(userRole)) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default PrivateRoute