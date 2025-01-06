import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth";
const UpdateAdmin = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // e.g. http://localhost:5169/api
  const navigate = useNavigate();
  const { id } = useParams(); // ID from route param: "/admin/update-admin/:id"

  // Local state for Admin fields
  const [admin, setAdmin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "Admin",
    specification: "",
    status: "Active",
    // password: "",
    // confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Fetch existing Admin data on mount
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Admin/${id}`, {
          headers: getAuthHeaders()
        });
        if (response.status === 200) {
          setAdmin(response.data);
        } else {
          setError("Failed to load Admin data");
        }
      } catch (err) {
        console.error("Error fetching Admin:", err);
        setError("Failed to fetch Admin data");
      }
    };
    fetchAdmin();
  }, [apiUrl, id]);

  // 2. Handle form submission to update admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Password verification check:
    // if (admin.password !== admin.confirmPassword) {
    //   setError("Passwords do not match!");
    //   setLoading(false);
    //   return;
    // }

    try {
      // Adjust endpoint if your API differs (e.g., "/Admin/update/{id}")
      const response = await axios.put(`${apiUrl}/Admin/update/${id}`, admin, {
        headers: getAuthHeaders()
      });
      if (response.status === 200) {
        alert("Admin updated successfully!");
        navigate("/admin/admin-list"); // Return to admin list
      }
    } catch (err) {
      console.error("Error updating Admin:", err);
      setError("Failed to update Admin. Please try again. Email or PhoneNumber might already existed! Check your password as well!");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Update Admin (ID: {id})</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-4 bg-white p-6 shadow-md rounded"
      >
        <div className="flex flex-col">
          <label htmlFor="firstName" className="font-semibold mb-1">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={admin.firstName || ""}
            onChange={(e) => setAdmin({ ...admin, firstName: e.target.value })}
            required
            className="border p-2 rounded"
            placeholder="Enter first name"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="lastName" className="font-semibold mb-1">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={admin.lastName || ""}
            onChange={(e) => setAdmin({ ...admin, lastName: e.target.value })}
            required
            className="border p-2 rounded"
            placeholder="Enter last name"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={admin.email}
            onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
            required
            className="border p-2 rounded"
            placeholder="Enter email"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phoneNumber" className="font-semibold mb-1">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="text"
            value={admin.phoneNumber || ""}
            onChange={(e) => setAdmin({ ...admin, phoneNumber: e.target.value })}
            required
            className="border p-2 rounded"
            placeholder="Enter phone number"
          />
        </div>

        {/* Role is "Admin" by default; read-only if you want to fix it */}
        <div className="flex flex-col">
          <label htmlFor="role" className="font-semibold mb-1">
            Role
          </label>
          <input
            id="role"
            type="text"
            value={admin.role || ""}
            onChange={(e) => setAdmin({ ...admin, role: e.target.value })}
            readOnly
            className="border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="specification" className="font-semibold mb-1">
            Specification
          </label>
          <input
            id="specification"
            type="text"
            value={admin.specification || ""}
            onChange={(e) =>
              setAdmin({ ...admin, specification: e.target.value })
            }
            className="border p-2 rounded"
            placeholder="e.g. Database Specialist"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="status" className="font-semibold mb-1">
            Status
          </label>
          <input
            id="status"
            type="text"
            value={admin.status || ""}
            onChange={(e) => setAdmin({ ...admin, status: e.target.value })}
            readOnly
            className="border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* <div className="flex flex-col">
          <label htmlFor="password" className="font-semibold mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={admin.password || ""}
            onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
            className="border p-2 rounded"
            placeholder="Enter password"
          />
        </div> */}

        {/* Confirm Password */}
        {/* <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="font-semibold mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={admin.confirmPassword}
            onChange={(e) => setAdmin({ ...admin, confirmPassword: e.target.value })}
            required
            className="border p-2 rounded"
            placeholder="Confirm password"
          />
        </div> */}

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="font-semibold mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={admin.confirmPassword}
            onChange={(e) => setAdmin({ ...admin, confirmPassword: e.target.value })}
            required
            className="border p-2 rounded"
            placeholder="Confirm password"
          />
        </div>

        {loading ? (
          <p className="text-blue-500 font-semibold">Updating admin...</p>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Admin
          </button>
        )}
      </form>
    </div>
  );
};

export default UpdateAdmin;
