import React, { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import api from "../api";

const DashboardServiceAdd = () => {
  const [formData, setFormData] = useState({
    service_name: "",
    description: "",
    price: "",
    duration: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Membuat FormData untuk mengirim data termasuk file
      const data = new FormData();
      data.append("service_name", formData.service_name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("duration", formData.duration);
      if (image) {
        data.append("image", image); // Menambahkan file gambar
      }

      // Mengirim permintaan ke server
      await api.post("/services", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Service added successfully!");
      setFormData({
        service_name: "",
        description: "",
        price: "",
        duration: "",
      });
      setImage(null);
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Error adding service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800">Add New Service</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="service_name" className="block text-gray-700">
              Service Name
            </label>
            <input
              type="text"
              id="service_name"
              name="service_name"
              value={formData.service_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="duration" className="block text-gray-700">
              Duration (minutes)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-gray-700">
              Service Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 text-white rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Service"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default DashboardServiceAdd;
