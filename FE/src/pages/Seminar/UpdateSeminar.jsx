import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth"; // Ensure you have this utility

const UpdateSeminar = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // e.g. http://localhost:5169/api
  const { id } = useParams(); // Seminar ID from route
  const navigate = useNavigate();

  const [seminar, setSeminar] = useState({
    conductedBy: 0, // Pre-fill conductedBy, will be set later based on logged-in user
    location: "",
    date: "",
    participantsCount: 0,
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeminar = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/Seminar/${id}`, {
          headers: getAuthHeaders(),
        });
        setSeminar(response.data);
      } catch (err) {
        console.error("Error fetching seminar:", err);
        setError("Failed to load seminar details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSeminar();
  }, [apiUrl, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(`${apiUrl}/Seminar/update/${id}`, seminar, {
        headers: getAuthHeaders(),
      });

      if (response.status === 200) {
        alert("Seminar updated successfully!");
        navigate("/seminar-list");
      }
    } catch (err) {
      console.error("Error updating seminar:", err);
      setError("Failed to update seminar. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading seminar details...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Update Seminar (ID: {id})</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-4 bg-white p-6 shadow-md rounded"
      >
        {/* Conducted By */}
        <div className="flex flex-col">
          <label htmlFor="conductedBy" className="font-semibold mb-1">
            Conducted By (User ID)
          </label>
          <input
            id="conductedBy"
            type="number"
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
            onChange={(e) => setSeminar({ ...seminar, participantsCount: parseInt(e.target.value) })}
            className="border p-2 rounded"
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
          ></textarea>
        </div>

        {/* Submit Button */}
        {loading ? (
          <p className="text-blue-500 font-semibold">Updating seminar...</p>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Seminar
          </button>
        )}

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateSeminar;
