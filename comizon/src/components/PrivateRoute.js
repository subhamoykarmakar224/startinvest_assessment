import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

// If authorized, return an outlet that will render child elements
// If not, return element that will navigate to login page
function PrivateRoute() {
    const { currentUser } = useAuth()
    return currentUser ? <Outlet /> : <Navigate to='/login' />;
}

export default PrivateRoute;

