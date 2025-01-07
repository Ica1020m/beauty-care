import React, { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";

const PortofolioEdit = () => {
  const { id } = useParams(); // Ambil ID staff dari URL params
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    description: "",
    password: "",
    role: "staff", // Default role adalah 'staff'
  });

  const [loading, setLoading] = useState(false);

  // Fetch data staff berdasarkan ID saat pertama kali komponen dimuat
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const {
          data: { data },
        } = await api.get(`/staff/detail/${id}`);
        console.log(data);
        setFormData({
          username: data.username,
          email: data.email,
          description: data.description,
          password: "", // Jangan tampilkan password, biarkan kosong
          role: data.role, // Ambil role yang sudah ada
        });
      } catch (error) {
        console.error("Error fetching staff data:", error);
        alert("Error fetching staff data");
      }
    };

    fetchStaffData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/staff/${id}`, formData);
      alert("Staff updated successfully!");
      navigate("/dashboard/staff"); // Kembali ke halaman daftar staff
    } catch (error) {
      console.error("Error updating staff:", error);
      alert("Error updating staff");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800">Edit Staff</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700">
              Staff username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password (leave blank to keep unchanged)
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Dropdown untuk memilih role */}
          <div>
            <label htmlFor="role" className="block text-gray-700">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="staff">Staff</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-pink-100 text-gray-800 rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default PortofolioEdit;
