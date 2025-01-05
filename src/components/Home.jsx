import React, { useEffect, useState } from "react";
import MainLayout from "./MainLayout";
import api from "../api";
import { Link } from "react-router-dom";

const Home = () => {
  const [services, setServices] = useState([]);

  const getServices = async () => {
    const {
      data: { data },
    } = await api.get("/services");
    setServices(data);
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-pink-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800">
            Discover Your True Beauty
          </h2>
          <p className="text-gray-600 mt-4">
            Experience the best services for you.
          </p>
          <button
            to="/services"
            className="mt-6 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          >
            <Link to="/services">Order Now</Link>
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-semibold text-gray-800">Our Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {services.length > 0
              ? services.slice(0, 3).map((service) => (
                  <>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h4 className="text-xl font-bold text-pink-600">
                        {service.service_name}
                      </h4>
                      <p className="text-gray-600 mt-2">
                        Get the perfect hairstyle for every occasion.
                      </p>
                    </div>
                  </>
                ))
              : "No services Available"}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-semibold text-gray-800">About Us</h3>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            At BeautyCare, we are dedicated to providing top-notch salon
            services with experienced professionals and premium products.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-semibold text-gray-800">Contact Us</h3>
          <p className="text-gray-600 mt-4">
            Reach out to us for inquiries or to book your appointment.
          </p>
          <form className="mt-8 max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 mt-4"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 mt-4"
            />
            <textarea
              placeholder="Your Message"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 mt-4"
            />
            <button className="w-full bg-pink-600 text-white py-2 rounded-lg mt-4 hover:bg-pink-700">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
