import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Service from "./components/Service";
import Staff from "./components/Staff";
import Dashboard from "./components/Dashboard";
import DashboardService from "./components/DashboardService";
import DashboardStaff from "./components/DashboardStaff";
import ServiceDetail from "./components/ServiceDetail";
import StaffPortofolio from "./components/StaffPortofolio";
import DashboardServiceAdd from "./components/DashboardServiceAdd";
import DashboardStaffAdd from "./components/DashboardStaffAdd";
import DashboardStaffEdit from "./components/DashboardStaffEdit";
import Register from "./components/Register";
import Profile from "./components/Profile";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile/:id" element={<Profile />} />

      <Route path="/staff" element={<Staff />} />
      <Route path="/staff/portofolio/:id" element={<StaffPortofolio />} />

      <Route path="/services" element={<Service />} />
      <Route path="/services/:id" element={<ServiceDetail />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/dashboard/staff" element={<DashboardStaff />} />
      <Route path="/dashboard/staff/add" element={<DashboardStaffAdd />} />
      <Route
        path="/dashboard/staff/edit/:id"
        element={<DashboardStaffEdit />}
      />

      <Route path="/dashboard/services" element={<DashboardService />} />
      <Route path="/dashboard/services/add" element={<DashboardServiceAdd />} />
    </Routes>
  );
}

export default App;
