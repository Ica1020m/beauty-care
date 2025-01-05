import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

const Dashboard = () => {
  const [userDetail, setUserDetail] = useState(null); // Set state ke null sebagai nilai awal
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserDetail(parsedUser); // Menyimpan data user ke state
      console.log(parsedUser); // Pastikan data benar-benar ada di console
    } else {
      navigate("/login"); // Jika tidak ada user, arahkan ke login
    }
  }, [navigate]);

  if (!userDetail) {
    // Tampilkan loading atau arahkan ke login jika data belum ada
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-gray-700 text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="mt-4">
          <h2 className="text-xl text-gray-600">
            Welcome to BeautyCare Dashboard!
          </h2>
          <p className="mt-2 text-gray-500">Hello, {userDetail.username}!</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
