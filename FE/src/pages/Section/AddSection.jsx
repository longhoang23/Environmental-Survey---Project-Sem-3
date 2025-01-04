import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSection = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // e.g., http://localhost:5169/api
  const [section, setSection] = useState({
    name: "",
  });

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post the new section data
      const response = await axios.post(`${apiUrl}/Section/create`, section, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // If success (201 Created or 200 OK)
      if (response.status === 201 || response.status === 200) {
        alert("Section added successfully!");
        navigate("/admin/sections"); // Navigate back to Section list
      }
    } catch (error) {
      console.error("Error adding Section:", error);
      alert("Failed to add Section");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-6 py-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-5 text-center">Add Section</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Section Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={section.name}
            onChange={(e) => setSection({ ...section, name: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Section
        </button>
      </form>
    </div>
  );
};

export default AddSection;
