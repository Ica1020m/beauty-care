import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import MainLayout from "./MainLayout";

const Service = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function getServices() {
      const {
        data: { data },
      } = await api.get("/services");
      setServices(data); // Update state dengan data yang diterima
    }

    getServices();
  }, []);

  return (
    <MainLayout>
      <section className="bg-pink-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800">Services</h2>
          <p className="text-gray-600 mt-4">List of our services</p>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.length > 0
            ? services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-200"
                >
                  {/* Menampilkan gambar dari server */}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">
                      {service.service_name}
                    </h3>
                    <p className="mt-2 text-gray-600">{service.description}</p>
                    <Link
                      to={`/services/` + service.id}
                      className="text-pink-600 hover:underline mt-4 inline-block"
                    >
                      Lihat Layanan
                    </Link>
                  </div>
                </div>
              ))
            : "No services available"}
        </div>
      </section>
    </MainLayout>
  );
};

export default Service;
