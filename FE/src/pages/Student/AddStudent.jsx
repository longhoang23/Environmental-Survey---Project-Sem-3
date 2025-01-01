import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // e.g. http://localhost:5169/api
  const navigate = useNavigate();

  // Student object based on the given fields
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    role: "Student",          // Default to "Student"
    klassId: 0,              // This will be updated by user selection
    specification: "",
    status: "NotRequested",   // Default per your requirement
    password: ""
  });

  // List of classes for the <select> dropdown
  const [klasses, setKlasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);

  // For request state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Fetch Klass list on mount
  useEffect(() => {
    const fetchKlasses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Klass/all`);
        setKlasses(response.data);
      } catch (err) {
        console.error("Error fetching classes:", err);
        setError("Failed to load class list");
      } finally {
        setLoadingClasses(false);
      }
    };
    fetchKlasses();
  }, [apiUrl]);

  // 2. Handle form submit -> POST student
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Adjust if your endpoint is different, e.g. "/Student"
      const response = await axios.post(`${apiUrl}/Student/create`, student, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200 || response.status === 201) {
        alert("Student created successfully!");
        navigate("/admin/student-list"); // go back to the student list
      }
    } catch (err) {
      console.error("Error creating student:", err);
      setError("Failed to create student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Conditionally render the form
  if (loadingClasses) {
    return <div>Loading classes...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Add Student</h2>

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
            value={student.firstName}
            onChange={(e) => setStudent({ ...student, firstName: e.target.value })}
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
            value={student.lastName}
            onChange={(e) => setStudent({ ...student, lastName: e.target.value })}
            required
            className="border p-2 rounded"
            placeholder="Enter last name"
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
            value={student.phoneNumber}
            onChange={(e) => setStudent({ ...student, phoneNumber: e.target.value })}
            required
            className="border p-2 rounded"
            placeholder="Enter phone number"
          />
        </div>

        {/* Role (read-only as "Student") */}
        <div className="flex flex-col">
          <label htmlFor="role" className="font-semibold mb-1">
            Role
          </label>
          <input
            id="role"
            type="text"
            value={student.role}
            onChange={(e) => setStudent({ ...student, role: e.target.value })}
            readOnly
            className="border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* KlassId as a <select> from Klass list */}
        <div className="flex flex-col">
          <label htmlFor="klassId" className="font-semibold mb-1">
            Class
          </label>
          <select
            id="klassId"
            value={student.klassId}
            onChange={(e) => setStudent({ ...student, klassId: parseInt(e.target.value) })}
            className="border p-2 rounded"
          >
            <option value={0}>-- Select Class --</option>
            {klasses.map((k) => (
              <option key={k.klassId} value={k.klassId}>
                {k.name}
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
            value={student.specification}
            onChange={(e) => setStudent({ ...student, specification: e.target.value })}
            className="border p-2 rounded"
            placeholder="e.g. Computer Science"
          />
        </div>

        {/* Status = NotRequested by default (read-only) */}
        <div className="flex flex-col">
          <label htmlFor="status" className="font-semibold mb-1">
            Status
          </label>
          <input
            id="status"
            type="text"
            value={student.status}
            onChange={(e) => setStudent({ ...student, status: e.target.value })}
            readOnly
            className="border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password" className="font-semibold mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={student.password}
            onChange={(e) => setStudent({ ...student, password: e.target.value })}
            required
            className="border p-2 rounded"
            placeholder="Enter password"
          />
        </div>

        {/* Submit */}
        {loading ? (
          <p className="text-blue-500 font-semibold">Creating student...</p>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Student
          </button>
        )}

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default AddStudent;
