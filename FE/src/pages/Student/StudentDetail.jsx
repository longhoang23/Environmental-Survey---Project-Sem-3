import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const StudentDetail = () => {
  const { id } = useParams(); // read student ID from the route parameter
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // e.g. http://localhost:5169/api
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch a single student by ID
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Student/${id}`);
        if (response.status === 200) {
          setStudent(response.data);
        } else {
          setError("Failed to load student detail.");
        }
      } catch (err) {
        console.error("Error loading student detail:", err);
        setError("Failed to load student detail");
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [apiUrl, id]);

  if (loading) return <div>Loading student detail...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!student) return <div>No student data found.</div>;

  // Display the student fields
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Student Detail (ID: {student.userID})
      </h2>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto">
        <p>
          <strong>First Name:</strong> {student.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {student.lastName}
        </p>
        <p>
          <strong>Email:</strong> {student.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {student.phoneNumber}
        </p>
        <p>
          <strong>Role:</strong> {student.role}
        </p>
        <p>
          <strong>RollOrEmpNo:</strong> {student.rollOrEmpNo}
        </p>
        <p>
          <strong>ClassId:</strong> {student.klassId}
        </p>
        <p>
          <strong>Specification:</strong> {student.specification}
        </p>
        <p>
          <strong>Admission Date:</strong>{" "}
          {student.admissionDate ? student.admissionDate.slice(0, 10) : ""}
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          {student.updatedAt ? student.updatedAt.slice(0, 10) : ""}
        </p>
        <p>
          <strong>Status:</strong> {student.status}
        </p>
        <p>
          <strong>Username:</strong> {student.username}
        </p>
        <p>
          <strong>Password (Hash):</strong> {student.password}
        </p>

        <button
          onClick={() => navigate("/admin/student-list")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default StudentDetail;
