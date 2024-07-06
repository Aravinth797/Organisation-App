import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import { Organisation } from "./components/Organisation";
import {jwtDecode} from "jwt-decode"; // Remove curly braces
import SideMenu from "./SideMenu";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Invalid token:', error);
        setIsLoggedIn(false);
      }
    }
  }, []);
  const navigate = useNavigate();


  function handleHome() {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <div className="App">
      <header className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Organisation</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="text-white hover:text-gray-200" onClick={handleHome}>
                  Home
                </Link>
              </li>
              {!isLoggedIn && (
                <>
                  <li>
                    <Link to="/" className="text-white hover:text-gray-200">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="text-white hover:text-gray-200">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <div className="flex">
        {isLoggedIn && <SideMenu setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
        <div className="p-4 flex-1">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard/user" element={<Dashboard />} />
            <Route path="/organisation/admin" element={<Organisation />} />
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
