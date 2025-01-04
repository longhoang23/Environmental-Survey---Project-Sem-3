import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">User information not available!</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { firstName, lastName, username, role } = user;

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center p-4">
      <div className="bg-white shadow-md rounded-lg w-full p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          User Profile
        </h1>
        <div className="space-y-4">
          <p>
            <strong>Name:</strong> {firstName} {lastName}
          </p>
          <p>
            <strong>Username:</strong> {username}
          </p>
          <p>
            <strong>Role:</strong>{" "}
            {role === 1 ? "Admin" : role === 2 ? "Staff" : "Student"}
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

export default Profile;
