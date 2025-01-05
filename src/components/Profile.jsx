import React, { useEffect, useState } from "react";
import MainLayout from "./MainLayout";
import api from "../api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true); // State untuk loading

  useEffect(() => {
    const getProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user")); // Ambil data user dari localStorage
        if (user?.id) {
          const {
            data: { data },
          } = await api.get(`/users/detail/${user.id}`);
          setProfile(data);
          console.log(profile);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false); // Matikan loading setelah data diambil
      }
    };

    getProfile();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <p className="text-gray-600 text-lg">Loading profile...</p>
        </div>
      </MainLayout>
    );
  }

  if (!profile) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <p className="text-red-600 text-lg">Profile not found!</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-sm w-full bg-white rounded-lg shadow-md overflow-hidden">
          {/* Avatar */}
          <div className="flex justify-center mt-6">
            <img
              src={profile.avatar || "https://via.placeholder.com/150"}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-2 border-pink-500"
            />
          </div>
          {/* User Details */}
          <div className="p-6">
            <h2 className="text-center text-2xl font-semibold text-gray-800">
              {profile.username || "No Name"}
            </h2>
            <p className="text-center text-gray-500">
              {profile.email || "No Email"}
            </p>
            <div className="mt-4">
              <p className="text-gray-700">
                <span className="font-medium capitalize">Role:</span>{" "}
                {profile.role || "No Phone"}
              </p>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="px-6 py-4 bg-gray-50">
            <button className="w-full bg-pink-500 text-white py-2 rounded-md shadow-md hover:bg-pink-600 transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
