import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import { FaHome, FaUser, FaSignInAlt, FaUserPlus } from "react-icons/fa";

function App() {
  return (
    <div className="d-flex">

      {/* ✅ SIDEBAR */}
      <div
        className="bg-dark text-white p-4 vh-100 shadow"
        style={{ width: "240px" }}
      >
        <h4 className="text-center mb-4">Task Manager</h4>

        <div className="d-grid gap-3">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `btn ${isActive ? "btn-primary" : "btn-outline-light"} text-start`
            }
          >
            <FaHome className="me-2" />
            Dashboard
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              `btn ${isActive ? "btn-primary" : "btn-outline-light"} text-start`
            }
          >
            <FaSignInAlt className="me-2" />
            Login
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              `btn ${isActive ? "btn-primary" : "btn-outline-light"} text-start`
            }
          >
            <FaUserPlus className="me-2" />
            Register
          </NavLink>

        </div>
      </div>

      {/* ✅ MAIN CONTENT */}
      <div className="flex-grow-1 p-4 bg-light">

        {/* 🔥 TOP NAVBAR */}
        <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-white rounded shadow-sm">
          <h5 className="mb-0">Dashboard</h5>

          <div>
            <span className="me-3">
              <FaUser /> User
            </span>
            <button 
                className="btn btn-danger btn-sm"
                onClick={() => {
  
                localStorage.removeItem("token");

                window.location.href = "/login";
                }}
            >
            Logout
            </button>          
            </div>
        </div>

        {/* ✅ ROUTES */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

      </div>
    </div>
  );
}


export default App;