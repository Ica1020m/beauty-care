import React, { useEffect, useState } from "react";
import MainLayout from "./MainLayout";
import api from "../api";
import { Link } from "react-router-dom";

const Staff = () => {
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    const getStaffs = async () => {
      const { data } = await api.get("/users/staff");
      setStaffs(data.staffs);
    };
    getStaffs();
  }, []);
  return (
    <MainLayout>
      <section className="bg-pink-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800">Staff</h2>
          <p className="text-gray-600 mt-4">
            The best Experienced Staff for you. Only you.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {staffs.length > 0
            ? staffs.map((staff) => (
                <>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img
                      src="https://via.placeholder.com/300"
                      alt="Staff 1"
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold">
                        {staff.username}
                      </h3>
                      <p className="text-gray-500">Makeup Artist</p>
                      <p className="mt-2 text-gray-700">{staff.description}</p>
                      <Link
                        to={`/staff/portofolio/${staff.id}`}
                        className="mt-2 text-pink-700 underline"
                      >
                        Portofolio
                      </Link>
                    </div>
                  </div>
                </>
              ))
            : "Staff tidak ada"}
        </div>
      </section>
    </MainLayout>
  );
};

export default Staff;
