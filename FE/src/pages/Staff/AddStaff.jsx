import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth";
const AddStaff = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // e.g. http://localhost:5169/api
  const navigate = useNavigate();

  // Staff object based on your JSON structure
  const [staff, setStaff] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "Staff", // Default to "Staff"
    sectionId: 0,
    specification: "",
    status: "",          // Could be an empty string initially
    password: "",
    confirmPassword: "",
  });

  // We'll fetch the sections to populate a <select>
  const [sections, setSections] = useState([]);
  const [loadingSections, setLoadingSections] = useState(true);

  // For overall request status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Fetch sections on mount
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Section/all`);
        setSections(response.data);
      } catch (err) {
        console.error("Error fetching sections:", err);
        setError("Failed to load sections.");
      } finally {
        setLoadingSections(false);
      }
    };
    fetchSections();
  }, [apiUrl]);

  // 2. Handle form submit -> POST staff
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Password verification check:
    if (staff.password !== staff.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      // Adjust the endpoint if your API is different, e.g. /Staff
      const response = await axios.post(`${apiUrl}/Staff/create`, staff, {
        headers: getAuthHeaders(),
      });
      if (response.status === 200 || response.status === 201) {
        alert("Staff created successfully!");
        navigate("/staff-list"); // Go back to the staff list route
      }
    } catch (err) {
      console.error("Error creating staff:", err);
      setError("Failed to create staff. Please try again. Email or PhoneNumber might already existed! Check your password as well!");
    } finally {
      setLoading(false);
    }
  };

  if (loadingSections) {
    return <div>Loading sections...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Add Staff</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-4 bg-white p-6 shadow-md rounded"
      >
        {/* First Name */}
        <div className="flex flex-col">
          <label htmlFor="firstName" className="font-semibold mb-1">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={staff.firstName}
            onChange={(e) => setStaff({ ...staff, firstName: e.target.value })}
            required
            className="border p-2 rounded"
            placeholder="Enter first name"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label htmlFor="lastName" className="font-semibold mb-1">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={staff.lastName}
            onChange={(e) => setStaff({ ...staff, lastName: e.target.value })}
            required
            className="border p-2 rounded"
            placeholder="Enter last name"
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

        {/* Phone Number */}
        <div className="flex flex-col">
          <label htmlFor="phoneNumber" className="font-semibold mb-1">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="text"
            value={staff.phoneNumber}
            onChange={(e) =>
              setStaff({ ...staff, phoneNumber: e.target.value })
            }
            required
            className="border p-2 rounded"
            placeholder="Enter phone number"
          />
        </div>

        {/* Role (read-only: Staff) */}
        <div className="flex flex-col">
          <label htmlFor="role" className="font-semibold mb-1">
            Role
          </label>
          <input
            id="role"
            type="text"
            value={staff.role}
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
            value={staff.sectionId}
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

        {/* specification */}
        <div className="flex flex-col">
          <label htmlFor="specification" className="font-semibold mb-1">
            Specification
          </label>
          <input
            id="specification"
            type="text"
            value={staff.specification}
            onChange={(e) =>
              setStaff({ ...staff, specification: e.target.value })
            }
            className="border p-2 rounded"
            placeholder="e.g. IT Support"
          />
        </div>

        {/* Status as <select> */}
        <div className="flex flex-col">
          <label htmlFor="status" className="font-semibold mb-1">
            Status
          </label>
          <select
            id="status"
            value={staff.status || 0}
            onChange={(e) =>
              setStaff({ ...staff, status: parseInt(e.target.value) })
            }
            className="border p-2 rounded"
          >
            {/* <option>-- Select Section --</option> */}
            <option value={0}>NotRequested</option>
            <option value={1}>Pending</option>
            <option value={2}>Active</option>
            <option value={3}>Decline</option>
          </select>
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password" className="font-semibold mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={staff.password}
            onChange={(e) => setStaff({ ...staff, password: e.target.value })}
            required
            className="border p-2 rounded"
            placeholder="Enter password"
          />
        </div>

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
          <p className="text-blue-500 font-semibold">Creating staff...</p>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Staff
          </button>
        )}

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default AddStaff;
