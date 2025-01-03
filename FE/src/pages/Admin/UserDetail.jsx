import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state?.user;

  if (!user) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">User details not available!</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const formatValue = (value) =>
    value === null || value === undefined ? "null" : value;

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          User Detail: {formatValue(user.firstName)}{" "}
          {formatValue(user.lastName)}
        </h1>
        <div className="space-y-4">
          <p>
            <strong>User ID:</strong> {formatValue(user.user.userID)}
          </p>
          <p>
            <strong>First Name:</strong> {formatValue(user.user.firstName)}
          </p>
          <p>
            <strong>Last Name:</strong> {formatValue(user.user.lastName)}
          </p>
          <p>
            <strong>Phone Number:</strong> {formatValue(user.user.phoneNumber)}
          </p>
          <p>
            <strong>Role:</strong>{" "}
            {user.user.role === 2
              ? "Staff"
              : user.user.role === 3
              ? "Student"
              : "Unknown"}
          </p>
          <p>
            <strong>Roll/Emp No:</strong> {formatValue(user.user.rollOrEmpNo)}
          </p>
          <p>
            <strong>Klass ID:</strong> {formatValue(user.user.klassId)}
          </p>
          <p>
            <strong>Section ID:</strong> {formatValue(user.user.sectionId)}
          </p>
          <p>
            <strong>Specification:</strong>{" "}
            {formatValue(user.user.specification)}
          </p>
          <p>
            <strong>Admission Date:</strong>{" "}
            {user.user.admissionDate
              ? new Date(user.user.admissionDate).toLocaleDateString()
              : "null"}
          </p>
          <p>
            <strong>Join Date:</strong>{" "}
            {user.user.joinDate
              ? new Date(user.user.joinDate).toLocaleDateString()
              : "null"}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {user.user.updatedAt
              ? new Date(user.user.updatedAt).toLocaleString()
              : "null"}
          </p>
          <p>
            <strong>Status:</strong> {formatValue(user.user.status)}
          </p>
          <p>
            <strong>Username:</strong> {formatValue(user.user.username)}
          </p>
          <p>
            <strong>Klass:</strong> {formatValue(user.user.klass)}
          </p>
          <p>
            <strong>Section:</strong> {formatValue(user.user.section)}
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UserDetail;
