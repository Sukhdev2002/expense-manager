import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home'
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import isNil from 'lodash/isNil';
import Register from './components/Register';
import Login from './components/Login';
import { getToken } from './services/data-service';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = getToken();
        setIsLoggedIn(!isNil(token));
    }, []);

    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={isLoggedIn ? <Home />: <Navigate to="/login" /> }  />
                    {/* Redirect to login if no matching route is found */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
