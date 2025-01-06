import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSection = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // e.g., http://localhost:5169/api
  const { sectionId } = useParams(); // Expecting a route param like /admin/update-section/:sectionId

  const [section, setSection] = useState({ name: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Section/${sectionId}`);
        if (response.status === 200) {
          setSection(response.data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching Section:", err);
        setError("Failed to fetch Section data.");
        setLoading(false);
      }
    };

    fetchSection();
  }, [apiUrl, sectionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${apiUrl}/Section/update/${sectionId}`,
        section,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Section updated successfully!");
        navigate("/admin/sections"); // Navigate back to the Section list
      }
    } catch (err) {
      console.error("Error updating Section:", err);
      setError("Failed to update Section.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl font-semibold">Loading Section data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 px-6 py-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-5 text-center">
        Update Section (ID: {sectionId})
      </h2>

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
            value={section.name || ""}
            onChange={(e) =>
              setSection({ ...section, [e.target.name]: e.target.value })
            }
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Update Section
        </button>

        {error && <p className="mt-3 text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateSection;
