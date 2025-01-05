import React, { useEffect, useState } from "react";
import MainLayout from "./MainLayout";
import api from "../api";
import { useParams } from "react-router-dom";

const StaffPortofolio = () => {
  const [portos, setPortos] = useState([]);
  const [staffDesc, setStaffDesc] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getStaffPortos = async () => {
      const {
        data: { data },
      } = await api.get(`/staff/portofolio/${id}`);
      if (data) {
        setPortos(data.portofolios);
        setStaffDesc(data);
        console.log(data);
      }
    };

    getStaffPortos();
  }, []);
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-10">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-6">
            <img
              src="https://via.placeholder.com/150"
              alt="Staff Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {staffDesc.username}
              </h1>
              <p className="text-pink-600">Makeup Artist</p>
              <p className="text-gray-600 mt-2">
                Ahli dalam makeup bridal dan casual. Memiliki pengalaman lebih
                dari 5 tahun di bidang kecantikan.
              </p>
            </div>
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="max-w-6xl mx-auto mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Portfolio Projects
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {portos.map((porto, key) => (
              <>
                <div
                  key={key}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-200"
                >
                  <img
                    src="https://via.placeholder.com/300x200"
                    alt="Bridal Makeup"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {porto.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{porto.description}</p>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StaffPortofolio;
