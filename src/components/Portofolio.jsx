import React, { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import api from "../api";
import { Link } from "react-router-dom";

const Portofolio = () => {
  const [loading, setLoading] = useState(true);
  const [portos, setPortos] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  // Fungsi untuk menghapus staff
  const deletePorto = async (id) => {
    try {
      const response = await api.delete(`/porto/${id}`);
      if (response.status === 200) {
        // Setelah berhasil dihapus, update daftar staff
        setPortos(portos.filter((porto) => porto.id !== id));
        alert("porto berhasil dihapus");
      }
    } catch (error) {
      console.error("Error deleting porto:", error);
      alert("Gagal menghapus porto");
    }
  };

  useEffect(() => {
    const getPortos = async () => {
      try {
        const {
          data: { data },
        } = await api.get("/porto");
        console.log(data);

        if (data) {
          setPortos(data);
        }
      } catch (error) {
        console.error("Error fetching portos:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    getPortos();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800">Porto</h1>
        <div className="mt-4">
          <h2 className="text-xl text-gray-600">
            Welcome to BeautyCare Salon Dashboard!
          </h2>
          <p className="mt-2 text-gray-500">
            Select a menu item from the sidebar to get started.
          </p>
        </div>
        <div className="my-4 text-right">
          <Link
            to="/dashboard/porto/add"
            className="px-6 py-2 bg-pink-100 text-gray-800 font-semibold rounded-lg hover:bg-pink-200 transition-colors"
          >
            Add New Porto
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-8">
          {loading ? (
            <div className="col-span-full text-center">
              <p className="text-lg text-gray-600">Loading...</p>
            </div>
          ) : portos.length > 0 ? (
            portos.map((porto, key) => (
              <div
                key={key}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4 p-6">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Staff"
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {porto.title}
                    </h3>
                  </div>
                </div>
                <div className="border-t flex">
                  <Link
                    to={`/porto/edit/${porto.id}`}
                    className="w-full text-center py-2 border-r border-gray-300 bg-transparent text-gray-800 font-semibold rounded-l-lg hover:bg-pink-100 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deletePorto(porto.id)} // Perbaiki di sini
                    className="w-full text-center py-2 bg-transparent text-gray-800 font-semibold rounded-b-lg hover:bg-pink-100 transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center">
              <p className="text-lg text-gray-600">Tidak ada data</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Portofolio;