import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Cek apakah ada user di localStorage saat komponen dimuat
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      console.log(parsedUser);
      // Jika ada, simpan data user
    } else {
      setUser(null); // Jika tidak ada, set user menjadi null
    }
    // console.log(parsedUser);
  }, []); // Hanya dijalankan sekali saat komponen pertama kali dimuat

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  alert("Berhasil Logout");
  location("/");
  };

  return (
    <div className="bg-transparent text-black">
      <div className="max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-black  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <svg
                className="block size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center"></div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className={`${
                    location.pathname === "/"
                      ? "rounded-md bg-pink-100 px-3 py-2 text-sm font-medium text-black"
                      : "rounded-md  px-3 py-2 text-sm font-medium text-black"
                  }`}
                  aria-current="page"
                >
                  Home
                </Link>
                <Link
                  to="/services"
                  className={`${
                    location.pathname === "/services"
                      ? "rounded-md bg-pink-100 px-3 py-2 text-sm font-medium text-black"
                      : "rounded-md  px-3 py-2 text-sm font-medium text-black"
                  }`}
                >
                  Services
                </Link>
                <Link
                  to="/staff"
                  className={`${
                    location.pathname === "/staff"
                      ? "rounded-md bg-pink-100 px-3 py-2 text-sm font-medium text-black"
                      : "rounded-md  px-3 py-2 text-sm font-medium text-black"
                  }`}
                >
                  Staff
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {user ? (
              <div className="space-x-3 flex">
                <Link
                  to={`/profile/${user.id}`}
                  className="rounded-md bg-pink-100 px-3 py-2 text-sm font-medium text-black"
                >
                  Profile
                </Link>
                <form onSubmit={handleLogout}>
                  <button
                    type="submit"
                    className="rounded-md bg-pink-100 px-3 py-2 text-sm font-medium text-black"
                  >
                    Logout
                  </button>
                </form>
              </div>
            ) : (
              <Link
                to="/login"
                className="rounded-md bg-pink-100 px-3 py-2 text-sm font-medium text-black"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link
            to="/"
            className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
            aria-current="page"
          >
            Home
          </Link>
          <Link
            to="/staff"
            className="block rounded-md px-3 py-2 text-base font-medium text-black "
          >
            Staff
          </Link>
          <Link
            to="/services"
            className="block rounded-md px-3 py-2 text-base font-medium text-black "
          >
            Services
          </Link>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-black "
          >
            Calendar
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
