import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddKlass = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const [klass, setKlass] = useState({
    name: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/Klass/create`, klass, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check success response (could be 201 Created or 200 OK)
      if (response.status === 201 || response.status === 200) {
        alert("Class added successfully!");
        // Navigate back to Klass list page
        navigate("/admin/classes");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding Klass");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-6 py-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-5 text-center">Add Klass</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Class Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={klass.name}
            onChange={(e) => setKlass({ ...klass, name: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Klass
        </button>
      </form>
    </div>
  );
};

export default AddKlass;
