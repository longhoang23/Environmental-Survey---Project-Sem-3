import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const StaffDetail = () => {
  const { id } = useParams(); // e.g. /admin/staff-detail/:id
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // e.g. http://localhost:5169/api
  const navigate = useNavigate();

  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch staff data by ID
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Staff/${id}`);
        if (response.status === 200) {
          setStaff(response.data);
        } else {
          setError("Failed to load staff detail.");
        }
      } catch (err) {
        console.error("Error loading staff detail:", err);
        setError("Failed to load staff detail.");
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, [apiUrl, id]);

  if (loading) {
    return <div>Loading staff detail...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!staff) {
    return <div>No staff data found.</div>;
  }

  // 2. Render the staff details
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Staff Detail (ID: {staff.userID})</h2>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-xl">
        <p>
          <strong>First Name:</strong> {staff.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {staff.lastName}
        </p>
        <p>
          <strong>Email:</strong> {staff.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {staff.phoneNumber}
        </p>
        <p>
          <strong>Role:</strong> {staff.role}
        </p>
        <p>
          <strong>RollOrEmpNo:</strong> {staff.rollOrEmpNo}
        </p>
        <p>
          <strong>Section Id:</strong> {staff.sectionId}
        </p>
        <p>
          <strong>Specification:</strong> {staff.specification}
        </p>
        <p>
          <strong>Join Date:</strong>{" "}
          {staff.joinDate ? staff.joinDate.slice(0, 10) : ""}
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          {staff.updatedAt ? staff.updatedAt.slice(0, 10) : ""}
        </p>
        <p>
          <strong>Status:</strong> {staff.status}
        </p>
        <p>
          <strong>Username:</strong> {staff.username}
        </p>
        {/* <p>
          <strong>Password (Hash):</strong> {staff.password}
        </p> */}

        <button
          onClick={() => navigate("/admin/staff-list")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default StaffDetail;
