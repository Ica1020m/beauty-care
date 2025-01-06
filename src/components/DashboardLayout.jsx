import React from "react";
import { Link, useNavigate } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.role);

  if (user.role!="admin" && user.role!="staff"){
    alert("Anda bukan Admin/Staff!");
    navigate("/");
  }
  

  const handleLogout = () => {
    // Implementasikan logika logout, misalnya dengan menghapus token dari localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login"); // Arahkan pengguna ke halaman login setelah logout
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-pink-600 text-white min-h-screen p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-6">BeautyCare</h2>
            <nav>
              <ul>
                <li>
                  <Link
                    to="/dashboard"
                    className={`${
                      location.pathname === "/dashboard"
                        ? "block py-2 px-4 rounded bg-pink-700"
                        : "block py-2 px-4 rounded"
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/services"
                    className={`${
                      location.pathname === "/dashboard/services"
                        ? "block py-2 px-4 rounded bg-pink-700"
                        : "block py-2 px-4 rounded"
                    }`}
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/staff"
                    className={`${
                      location.pathname === "/dashboard/staff"
                        ? "block py-2 px-4 rounded bg-pink-700"
                        : "block py-2 px-4 rounded"
                    }`}
                  >
                    Staff
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Tombol Logout di bagian bawah */}
          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="w-full py-2 px-4 bg-pink-700 text-white rounded hover:bg-pink-800"
            >
              Logout
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
