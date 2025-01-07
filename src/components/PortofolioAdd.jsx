import React, { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import api from "../api";

const PortofolioAdd = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(true); // Default loading true
  const [allStaffs, setAllStaffs] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Ambil data staff
  useEffect(() => {
    const getStaffs = async () => {
      try {
        const response = await api.get("/users/staff");
        setAllStaffs(response.data.staffs);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      } finally {
        setLoading(false); // Selesai loading
      }
    };
    getStaffs();
  }, []);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/porto", formData);
      alert("Staff added successfully!");
      setFormData({
        user_id: "",
        title: "",
        description: "",
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
        <h1 className="text-3xl font-bold text-gray-800">Add New Porto</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
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

          {/* Dropdown untuk memilih staff */}
          <div>
            <label htmlFor="user_id" className="block text-gray-700">
              Staff
            </label>
            {loading ? (
              <p>Loading staff data...</p>
            ) : (
              <select
                id="user_id"
                name="user_id"
                value={formData.user_id}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Staff</option>
                {allStaffs.map((staff) => (
                  <option key={staff.id} value={staff.id}>
                    {staff.username}
                  </option>
                ))}
              </select>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-pink-100 text-gray-800 rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Porto"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default PortofolioAdd;
