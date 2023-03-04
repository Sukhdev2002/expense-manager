import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home'
import Login from './components/Login';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {
  const [isLogin ,setIsLogin] = useState(true);
  
  return(
   
    <BrowserRouter>
      <div>
        <Routes>
       <Route path="/" element={(isLogin)?<Home/>:<Login setIsLogin = {setIsLogin}></Login>} />
         
        </Routes>
      </div>
    </BrowserRouter>
  )

}

export default App;
