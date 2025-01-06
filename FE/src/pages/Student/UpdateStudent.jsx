import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth";
const UpdateStudent = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // e.g. http://localhost:5169/api
  const { id } = useParams(); // e.g. /admin/update-student/:id
  const navigate = useNavigate();

  // Student object, with "status" defaulting to "0" (NotRequested) if blank
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "Student",
    klassId: 0,
    specification: "",
    status: "",
    // password: "",
    // confirmPassword: "",
  });

  const [klasses, setKlasses] = useState([]); // for <select> of classes
  const [loading, setLoading] = useState(false);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch classes + existing student data on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Load classes
        const klassResponse = await axios.get(`${apiUrl}/Klass/all`);
        setKlasses(klassResponse.data);

        // Load student
        const studentResponse = await axios.get(`${apiUrl}/Student/${id}`, {
          headers: getAuthHeaders(),
        });
        if (studentResponse.status === 200) {
          // Fill in the form
          setStudent(studentResponse.data);
        } else {
          setError("Failed to load student data.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
        setLoadingClasses(false);
      }
    };

    fetchData();
  }, [apiUrl, id]);

  // 2. Handle submit -> PUT to update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Password verification check:
    // if (student.password !== student.confirmPassword) {
    //   setError("Passwords do not match!");
    //   setLoading(false);
    //   return;
    // }

    try {
      // Adjust if your endpoint is different (e.g., /Student/update/{id})
      const response = await axios.put(
        `${apiUrl}/Student/update/${id}`,
        student,
        {
          headers: getAuthHeaders(),
        }
      );
      if (response.status === 200) {
        alert("Student updated successfully!");
        navigate("/student-list");
      }
    } catch (err) {
      console.error("Error updating student:", err);
      setError("Failed to update student. Please try again. Email or PhoneNumber might already existed! Check your password as well!");
    } finally {
      setLoading(false);
    }
  };

  if (loadingClasses) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Update Student (ID: {id})</h2>

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
            value={student.firstName || ""}
            onChange={(e) =>
              setStudent({ ...student, firstName: e.target.value })
            }
            required
            className="border p-2 rounded"
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
            value={student.lastName || ""}
            onChange={(e) =>
              setStudent({ ...student, lastName: e.target.value })
            }
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
            value={student.email}
            onChange={(e) => setStudent({...student, email: e.target.value})}
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
            value={student.phoneNumber || ""}
            onChange={(e) =>
              setStudent({ ...student, phoneNumber: e.target.value })
            }
            required
            className="border p-2 rounded"
          />
        </div>

        {/* Role (read-only) */}
        <div className="flex flex-col">
          <label htmlFor="role" className="font-semibold mb-1">
            Role
          </label>
          <input
            id="role"
            type="text"
            value={student.role || ""}
            onChange={(e) => setStudent({ ...student, role: e.target.value })}
            readOnly
            className="border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* KlassId as <select> */}
        <div className="flex flex-col">
          <label htmlFor="klassId" className="font-semibold mb-1">
            Class
          </label>
          <select
            id="klassId"
            value={student.klassId || 0}
            onChange={(e) =>
              setStudent({ ...student, klassId: parseInt(e.target.value) })
            }
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
            value={student.specification || ""}
            onChange={(e) =>
              setStudent({ ...student, specification: e.target.value })
            }
            className="border p-2 rounded"
          />
        </div>

        {/* Status as <select> from your enum */}
        <div className="flex flex-col">
          <label htmlFor="status" className="font-semibold mb-1">
            Status
          </label>
          <select
            id="status"
            value={student.status || 0}
            onChange={(e) =>
              setStudent({ ...student, status: parseInt(e.target.value) })
            }
            readOnly
            className="border p-2 rounded bg-gray-100"
          >
            <option value={0}>NotRequested</option>
            readOnly
            <option value={1}>Pending</option>
            <option value={2}>Active</option>
            <option value={3}>Decline</option>
          </select>
        </div>

        {/* Password */}
        {/* <div className="flex flex-col">
          <label htmlFor="password" className="font-semibold mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={student.password || ""}
            onChange={(e) => setStudent({ ...student, password: e.target.value })}
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
            value={student.confirmPassword}
            onChange={(e) => setStudent({ ...student, confirmPassword: e.target.value })}
            required
            className="border p-2 rounded"
            placeholder="Confirm password"
          />
        </div> */}
        
        {/* Submit */}
        {loading ? (
          <p className="text-blue-500 font-semibold">Updating student...</p>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Student
          </button>
        )}

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateStudent;
