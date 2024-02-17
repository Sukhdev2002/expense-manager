import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import Home from './components/Home'
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Register from './components/Register';
import Header from './components/Header';
import Login from './components/Login';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={isLoggedIn? <Header />: <Navigate to="/login" /> }  />
                    {/* Redirect to login if no matching route is found */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
