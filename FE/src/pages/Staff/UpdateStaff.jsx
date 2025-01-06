import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth";

const UpdateStaff = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // e.g. http://localhost:5169/api
  const { id } = useParams(); // e.g. /admin/update-staff/:id
  const navigate = useNavigate();

  // Staff object
  const [staff, setStaff] = useState({
    firstName: "",
    lastName: "",
    email : "",
    phoneNumber: "",
    role: "Staff",  // read-only
    sectionId: 0,
    specification: "",
    status: "",     // read-only
    // password: "",
    // confirmPassword: "",
  });

  // For fetching sections
  const [sections, setSections] = useState([]);
  const [loadingSections, setLoadingSections] = useState(true);

  // For request status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Fetch sections & existing staff data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Load sections
        const sectionRes = await axios.get(`${apiUrl}/Section/all`);
        setSections(sectionRes.data);

        // Load staff detail
        const staffRes = await axios.get(`${apiUrl}/Staff/${id}`, {
          headers: getAuthHeaders()
        });
        if (staffRes.status === 200) {
          setStaff(staffRes.data);
        } else {
          setError("Failed to load staff data.");
        }
      } catch (err) {
        console.error("Error fetching staff/sections:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
        setLoadingSections(false);
      }
    };

    fetchData();
  }, [apiUrl, id]);

  // 2. Handle form submission => PUT /Staff/update/{id}
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

     // Password verification check:
    //  if (staff.password !== staff.confirmPassword) {
    //   setError("Passwords do not match!");
    //   setLoading(false);
    //   return;
    // }

    try {
      // We form the request body from 'staff' state
      const response = await axios.put(`${apiUrl}/Staff/update/${id}`, staff, {
        headers: getAuthHeaders()
      });

      if (response.status === 200) {
        alert("Staff updated successfully!");
        navigate("/admin/staff-list");
      }
    } catch (err) {
      console.error("Error updating staff:", err);
      setError("Failed to update staff. Please try again. Email or PhoneNumber might already existed! Check your password as well!");
    } finally {
      setLoading(false);
    }
  };

  if (loadingSections) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Update Staff (ID: {id})</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-4 bg-white p-6 shadow-md rounded"
      >
        {/* FirstName */}
        <div className="flex flex-col">
          <label htmlFor="firstName" className="font-semibold mb-1">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={staff.firstName || ""}
            onChange={(e) => setStaff({ ...staff, firstName: e.target.value })}
            required
            className="border p-2 rounded"
          />
        </div>

        {/* LastName */}
        <div className="flex flex-col">
          <label htmlFor="lastName" className="font-semibold mb-1">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={staff.lastName || ""}
            onChange={(e) => setStaff({ ...staff, lastName: e.target.value })}
            required
            className="border p-2 rounded"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={staff.email}
            onChange={(e) => setStaff({...staff, email: e.target.value})}
            required
            className="border p-2 rounded"
            placeholder="Enter email"
          />
        </div>

        {/* PhoneNumber */}
        <div className="flex flex-col">
          <label htmlFor="phoneNumber" className="font-semibold mb-1">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="text"
            value={staff.phoneNumber || ""}
            onChange={(e) => setStaff({ ...staff, phoneNumber: e.target.value })}
            required
            className="border p-2 rounded"
          />
        </div>

        {/* Role is read-only as "Staff" */}
        <div className="flex flex-col">
          <label htmlFor="role" className="font-semibold mb-1">
            Role
          </label>
          <input
            id="role"
            type="text"
            value={staff.role || ""}
            readOnly
            className="border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* sectionId as <select> */}
        <div className="flex flex-col">
          <label htmlFor="sectionId" className="font-semibold mb-1">
            Section
          </label>
          <select
            id="sectionId"
            value={staff.sectionId || 0}
            onChange={(e) =>
              setStaff({ ...staff, sectionId: parseInt(e.target.value) })
            }
            className="border p-2 rounded"
          >
            <option value={0}>-- Select Section --</option>
            {sections.map((section) => (
              <option key={section.sectionId} value={section.sectionId}>
                {section.name}
              </option>
            ))}
          </select>
        </div>

        {/* Specification */}
        <div className="flex flex-col">
          <label htmlFor="specification" className="font-semibold mb-1">
            Specification
          </label>
          <input
            id="specification"
            type="text"
            value={staff.specification || ""}
            onChange={(e) => setStaff({ ...staff, specification: e.target.value })}
            className="border p-2 rounded"
          />
        </div>

        {/* Status (READ-ONLY) */}
        <div className="flex flex-col">
          <label htmlFor="status" className="font-semibold mb-1">
            Status
          </label>
          <input
            id="status"
            type="text"
            value={staff.status || ""}
            className="border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Password (if you want to update it) */}
        {/* <div className="flex flex-col">
          <label htmlFor="password" className="font-semibold mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={staff.password || ""}
            onChange={(e) => setStaff({ ...staff, password: e.target.value })}
            className="border p-2 rounded"
            placeholder="Enter new password if changing"
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
            value={staff.confirmPassword}
            onChange={(e) => setStaff({ ...staff, confirmPassword: e.target.value })}
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
            value={staff.confirmPassword}
            onChange={(e) => setStaff({ ...staff, confirmPassword: e.target.value })}
            required
            className="border p-2 rounded"
            placeholder="Confirm password"
          />
        </div>

        {loading ? (
          <p className="text-blue-500 font-semibold">Updating staff...</p>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Staff
          </button>
        )}

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateStaff;
