import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAdmin = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // e.g. http://localhost:5169/api
  const navigate = useNavigate();

  // Admin object based on the given fields
  const [admin, setAdmin] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    role: "Admin",          // Default to "Admin" as specified
    specification: "",
    status: "Active", // Default to "NotRequested"
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAdmin((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Adjust if your endpoint is different, e.g. /Admin/create
      const response = await axios.post(`${apiUrl}/Admin/create`, admin, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check for success (could be 201 or 200 depending on your API)
      if (response.status === 201 || response.status === 200) {
        alert("Admin created successfully!");
        navigate("/admin/admin-list"); // Go back to Admin list route
      }
    } catch (err) {
      console.error("Error creating Admin:", err);
      setError("Failed to create Admin. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Add Admin</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 bg-white p-6 shadow-md rounded">
        
        <div className="flex flex-col">
          <label htmlFor="firstName" className="font-semibold mb-1">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={admin.firstName}
            onChange={(e) => setAdmin({...admin, firstName: e.target.value})}
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
            name="lastName"
            type="text"
            value={admin.lastName}
            onChange={(e) => setAdmin({...admin, lastName: e.target.value})}
            required
            className="border p-2 rounded"
            placeholder="Enter last name"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phoneNumber" className="font-semibold mb-1">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            value={admin.phoneNumber}
            onChange={(e) => setAdmin({...admin, phoneNumber: e.target.value})}
            required
            className="border p-2 rounded"
            placeholder="Enter phone number"
          />
        </div>

        {/* Role is "Admin" by default, but you can hide or display a read-only field */}
        <div className="flex flex-col">
          <label htmlFor="role" className="font-semibold mb-1">
            Role
          </label>
          <input
            id="role"
            name="role"
            type="text"
            value={admin.role}
            onChange={(e) => setAdmin({...admin, role: e.target.value})}
            readOnly // or remove this if you want to allow changing
            className="border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="specification" className="font-semibold mb-1">
            Specification
          </label>
          <input
            id="specification"
            name="specification"
            type="text"
            value={admin.specification}
            onChange={(e) => setAdmin({...admin, specification: e.target.value})}
            className="border p-2 rounded"
            placeholder="e.g. Database Specialist"
          />
        </div>

        {/* Status is "NotRequested" by default */}
        <div className="flex flex-col">
          <label htmlFor="status" className="font-semibold mb-1">
            Status
          </label>
          <input
            id="status"
            name="status"
            type="text"
            value={admin.status}
            onChange={(e) => setAdmin({...admin, status: e.target.value})}
            readOnly // or remove this if you want to allow changing
            className="border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="font-semibold mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="text"
            value={admin.password}
            onChange={(e) => setAdmin({...admin, password: e.target.value})}
            required
            className="border p-2 rounded"
            placeholder="Enter password"
          />
        </div>

        {loading ? (
          <p className="text-blue-500 font-semibold">Creating admin...</p>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Admin
          </button>
        )}

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default AddAdmin;
