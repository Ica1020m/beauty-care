import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainLayout from "./MainLayout";
import api from "../api";

const ServiceDetail = () => {
  const { id } = useParams();
  const [serviceDetail, setServiceDetail] = useState(null);
  const parsedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!parsedUser) {
      alert("harap login terlebih dahulu");
      navigate("/login");
    }
    const getServiceDetail = async () => {
      const {
        data: { data },
      } = await api.get(`/services/${id}`);
      if (data) {
        setServiceDetail(data);
        console.log(data);
      }
    };
    getServiceDetail();
  }, []);


  const getTodayDate = () => {
    const today = new Date();

    // Ambil bagian tahun, bulan, dan tanggal
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Tambah 1 karena bulan dimulai dari 0
    const day = String(today.getDate()).padStart(2, "0");

    // Gabungkan menjadi format yyyy-mm-dd
    return `${year}-${month}-${day}`;
  };

  const orderHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/orders", {
        user_id: parsedUser.id,
        service_id: serviceDetail.id,
        order_date: getTodayDate(),
        status: "pending",
        total_price: serviceDetail.price,
      });
      alert("Order berhasil!");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat memproses order.");
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800">Makeup Service</h1>
            <p className="mt-2 text-lg text-gray-600">
              Tampil cantik dan percaya diri dengan berbagai pilihan makeup,
              dari casual hingga glam.
            </p>
          </div>

          {/* Service Detail */}
          <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
            {/* Gambar Layanan */}
            <div className="lg:w-1/2 w-full">
              <img
                src={
                  serviceDetail?.image ||
                  "https://via.placeholder.com/800x500?text=Makeup"
                }
                alt="Makeup"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Detail Layanan */}
            <div className="lg:w-1/2 w-full text-center lg:text-left">
              <h3 className="text-2xl font-semibold text-gray-800">
                Detail Layanan
              </h3>
              <p className="mt-4 text-gray-600">{serviceDetail?.description}</p>
              <div className="mt-6 flex justify-center lg:justify-start">
                <span className="text-lg font-bold text-pink-600">
                  Rp.{serviceDetail?.price.toLocaleString()}
                </span>
              </div>
              <form onSubmit={orderHandler} className="mt-6 text-center">
                <button className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition duration-200">
                  Order Now
                </button>
              </form>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center mt-10">
            <Link
              to="/services"
              className="text-pink-600 hover:underline text-lg"
            >
              Back to Services
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ServiceDetail;
