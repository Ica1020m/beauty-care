import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import api from "../api";

const DashboardStaffAdd = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    description: "",
    password: "",
    role: "staff", // Default role adalah 'staff'
  });

  const [loading, setLoading] = useState(false);

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
      await api.post("/staff/add", formData);
      alert("Staff added successfully!");
      setFormData({
        username: "",
        email: "",
        description: "",
        password: "",
        role: "staff", // Reset role ke 'staff' setelah submit
      });
    } catch (error) {
      console.error("Error adding Staff:", error);
      alert("Error adding staff");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800">Add New Staff</h1>
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
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
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
            {loading ? "Saving..." : "Save Staff"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default DashboardStaffAdd;
