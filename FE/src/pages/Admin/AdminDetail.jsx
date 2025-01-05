import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AdminDetail = () => {
  const { id } = useParams(); // read admin ID from the route parameter
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Admin/${id}`);
        if (response.status === 200) {
          setAdmin(response.data);
        } else {
          setError("Failed to load admin detail");
        }
      } catch (err) {
        console.error("Error loading admin detail:", err);
        setError("Failed to load admin detail");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, [apiUrl, id]);

  if (loading) return <div>Loading admin detail...</div>;
  if (error) return <div>{error}</div>;
  if (!admin) return <div>No admin data found.</div>;

  // Display full admin data
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Admin Detail (ID: {admin.userID})</h2>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-xl">
        <p>
          <strong>First Name:</strong> {admin.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {admin.lastName}
        </p>
        <p>
          <strong>Email:</strong> {admin.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {admin.phoneNumber}
        </p>
        <p>
          <strong>Role:</strong> {admin.role}
        </p>
        <p>
          <strong>RollOrEmpNo:</strong> {admin.rollOrEmpNo}
        </p>
        <p>
          <strong>Specification:</strong> {admin.specification}
        </p>
        <p>
          <strong>Join Date:</strong> {admin.joinDate}
        </p>
        <p>
          <strong>Updated At:</strong> {admin.updatedAt}
        </p>
        <p>
          <strong>Status:</strong> {admin.status}
        </p>
        <p>
          <strong>Username:</strong> {admin.username}
        </p>
        <p>
          <strong>Password:</strong> {admin.password}
        </p>

        <button
          onClick={() => navigate("/admin/admin-list")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default AdminDetail;
