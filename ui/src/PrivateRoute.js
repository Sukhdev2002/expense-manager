// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
const PrivateRoute = ({ element: Element, isLoggedIn }) => {
    return (
        <>

        console.log(element,isLoggedIn);
        <Route

            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        </>
    );
};

export default PrivateRoute;
