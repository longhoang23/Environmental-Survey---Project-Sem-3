import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth"; // Assuming you have this utility

const AddCompetition = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // e.g. http://localhost:5169/api
  const navigate = useNavigate();

  // Competition object
  const [competition, setCompetition] = useState({
    title: "",
    description: "",
    prizeDetails: "",
    winner1: "",
    winner2: "",
    winner3: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${apiUrl}/Competition/create`, competition, {
        headers: getAuthHeaders(),
      });

      if (response.status === 201 || response.status === 200) {
        alert("Competition created successfully!");
        navigate("/competition-list");
      }
    } catch (err) {
      console.error("Error creating competition:", err);
      setError("Failed to create competition. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add Competition</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded shadow-md space-y-4"
      >
        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="font-semibold mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={competition.title}
            onChange={(e) => setCompetition({ ...competition, title: e.target.value })}
            required
            className="border p-2 rounded"
            placeholder="Enter competition title"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="font-semibold mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={competition.description}
            onChange={(e) => setCompetition({ ...competition, description: e.target.value })}
            className="border p-2 rounded"
            placeholder="Enter competition description"
            rows={4}
          ></textarea>
        </div>

        {/* Prize Details */}
        <div className="flex flex-col">
          <label htmlFor="prizeDetails" className="font-semibold mb-1">
            Prize Details
          </label>
          <input
            id="prizeDetails"
            type="text"
            value={competition.prizeDetails}
            onChange={(e) => setCompetition({ ...competition, prizeDetails: e.target.value })}
            className="border p-2 rounded"
            placeholder="Enter prize details"
          />
        </div>

        {/* Winner 1 */}
        <div className="flex flex-col">
          <label htmlFor="winner1" className="font-semibold mb-1">
            Winner 1 (User ID)
          </label>
          <input
            id="winner1"
            type="number"
            value={competition.winner1 || ""}
            onChange={(e) => setCompetition({ ...competition, winner1: parseInt(e.target.value) || 0 })}
            className="border p-2 rounded"
            placeholder="Enter winner 1 user ID (optional)"
          />
        </div>

        {/* Winner 2 */}
        <div className="flex flex-col">
          <label htmlFor="winner2" className="font-semibold mb-1">
            Winner 2 (User ID)
          </label>
          <input
            id="winner2"
            type="number"
            value={competition.winner2 || ""}
            onChange={(e) => setCompetition({ ...competition, winner2: parseInt(e.target.value) || 0 })}
            className="border p-2 rounded"
            placeholder="Enter winner 2 user ID (optional)"
          />
        </div>

        {/* Winner 3 */}
        <div className="flex flex-col">
          <label htmlFor="winner3" className="font-semibold mb-1">
            Winner 3 (User ID)
          </label>
          <input
            id="winner3"
            type="number"
            value={competition.winner3 || ""}
            onChange={(e) => setCompetition({ ...competition, winner3: parseInt(e.target.value) || 0 })}
            className="border p-2 rounded"
            placeholder="Enter winner 3 user ID (optional)"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Submit Button */}
        <div>
          {loading ? (
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded opacity-50 cursor-not-allowed"
              disabled
            >
              Creating...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Competition
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddCompetition;
