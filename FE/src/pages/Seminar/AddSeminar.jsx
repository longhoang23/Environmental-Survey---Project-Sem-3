import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth"; // Import the helper function

const AddSeminar = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const conductedBy = currentUser?.userID || 0;

  const [seminar, setSeminar] = useState({
    conductedBy: conductedBy,
    location: "",
    date: "",
    participantsCount: 0,
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${apiUrl}/Seminar/create`, seminar, {
        headers: getAuthHeaders(), // Use the helper function here
      });

      if (response.status === 201 || response.status === 200) {
        alert("Seminar created successfully!");
        navigate("/seminar-list");
      }
    } catch (err) {
      console.error("Error creating seminar:", err);
      setError("Failed to create seminar. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Add Seminar</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 bg-white p-6 shadow-md rounded">
        <div className="flex flex-col">
          <label htmlFor="conductedBy" className="font-semibold mb-1">
            Conducted By (User ID)
          </label>
          <input
            id="conductedBy"
            type="text"
            value={seminar.conductedBy}
            readOnly
            className="border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>
         {/* Location */}
         <div className="flex flex-col">
          <label htmlFor="location" className="font-semibold mb-1">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={seminar.location}
            onChange={(e) => setSeminar({ ...seminar, location: e.target.value })}
            required
            className="border p-2 rounded"
            placeholder="Enter location"
          />
        </div>

        {/* Date */}
        <div className="flex flex-col">
          <label htmlFor="date" className="font-semibold mb-1">
            Date
          </label>
          <input
            id="date"
            type="datetime-local"
            value={seminar.date}
            onChange={(e) => setSeminar({ ...seminar, date: e.target.value })}
            required
            className="border p-2 rounded"
          />
        </div>

        {/* Participants Count */}
        <div className="flex flex-col">
          <label htmlFor="participantsCount" className="font-semibold mb-1">
            Participants Count
          </label>
          <input
            id="participantsCount"
            type="number"
            value={seminar.participantsCount}
            onChange={(e) =>
              setSeminar({ ...seminar, participantsCount: parseInt(e.target.value) })
            }
            min="0"
            className="border p-2 rounded"
            placeholder="Enter participants count"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="font-semibold mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={seminar.description}
            onChange={(e) => setSeminar({ ...seminar, description: e.target.value })}
            required
            className="border p-2 rounded"
            placeholder="Enter description"
            rows="4"
          ></textarea>
        </div>

        {/* Submit Button */}
        {loading ? (
          <p className="text-blue-500 font-semibold">Creating seminar...</p>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Seminar
          </button>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default AddSeminar;
