import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home'
import Login from './components/Login';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Register from './components/Register';
//
// function App() {
//   const [isLogin ,setIsLogin] = useState(true);
//
//   return(
//
//     <BrowserRouter>
//       <div>
//         <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/home" element={<Home />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   )
//
// }
//
// export default App;


// function App() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status
//
//     return (
//         <BrowserRouter>
//             <div>
//                 <Routes>
//                     <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//                     <Route path="/register" element={<Register />} />
//                     {/* Protected route for home page */}
//                     <PrivateRoute path="/home" element={<Home />} isLoggedIn={isLoggedIn} />
//                     {/* Redirect to login if no matching route is found */}
//                     <Route path="*" element={<Navigate to="/login" />} />
//                 </Routes>
//             </div>
//         </BrowserRouter>
//     );
// }

// Protected route component to redirect to login if user is not authenticated

// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
// import Home from './components/Home';
// import Login from './components/Login';
// import Register from './components/Register';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <BrowserRouter>
            <div>
                console.log(isLoggedIn)
                <h1>{isLoggedIn}</h1>
                <Routes>
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={isLoggedIn? <Home />: <Navigate to="/login" /> }  />
                    {/* Redirect to login if no matching route is found */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
