import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth";

const AddParticipation = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const navigate = useNavigate();

  // Retrieve current user and survey from localStorage
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userID = currentUser?.userID || 0; // Get user ID from localStorage

  const [participation, setParticipation] = useState({
    userID: userID,
    surveyID: 0,
    participationDate: new Date().toISOString().split("T")[0],
    totalScore: 0,
    feedback: "",
  });

  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Fetch Klass list on mount
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Survey/all`, {
          headers: getAuthHeaders(), // Include headers if required
        });
        setSurveys(response.data);
      } catch (err) {
        console.error("Error fetching classes:", err);
        setError("Failed to load class list");
      } finally {
        setLoadingClasses(false);
      }
    };
    fetchSurveys();
  }, [apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${apiUrl}/Participation/create`, participation, {
        headers: getAuthHeaders(),
      });
    
      if (response.status === 200 || response.status === 201) {
        alert("Participation created successfully!");
        navigate("/participation-list");
      }
    } catch (err) {
      console.error("Error creating participation:", err);
      if (err.response) {
        // Display backend error message if available
        setError(err.response.data.message || "Failed to create participation.");
      } else {
        setError("Failed to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };    
  const userRole = JSON.parse(localStorage.getItem("user")).role;
  const isStudent = userRole === 3;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Add Participation</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-md rounded">
        {/* Readonly User ID */}
        <div className="flex flex-col mb-4">
          <label htmlFor="userID" className="font-semibold mb-1">
            User ID
          </label>
          <input
            id="userID"
            type="text"
            value={participation.userID}
            readOnly
            className="border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Survey Selection */}
        <div className="flex flex-col mb-4">
          <label htmlFor="surveyID" className="font-semibold mb-1">
            Survey
          </label>
          <select
            id="surveyID"
            value={participation.surveyID}
            onChange={(e) => setParticipation({ ...participation, surveyID: parseInt(e.target.value) })}
            className="border p-2 rounded"
            required
          >
            <option value={0}>-- Select Survey --</option>
            {surveys.map((survey) => (
              <option key={survey.surveyID} value={survey.surveyID}>
                {survey.title}
              </option>
            ))}
          </select>
        </div>

        {/* Participation Date */}
        <div className="flex flex-col mb-4">
          <label htmlFor="participationDate" className="font-semibold mb-1">
            Participation Date
          </label>
          <input
            id="participationDate"
            type="date"
            value={participation.participationDate}
            onChange={(e) =>
              setParticipation({ ...participation, participationDate: e.target.value })
            }
            readOnly
            className="border p-2 rounded bg-gray-100 cursor-not-allowed"
            
          />
        </div>

        {/* Total Score */}
        <div className="flex flex-col mb-4">
          <label htmlFor="totalScore" className="font-semibold mb-1">
            Total Score
          </label>
          <input
            id="totalScore"
            type="number"
            value={participation.totalScore}
            onChange={(e) =>
              setParticipation({ ...participation, totalScore: parseInt(e.target.value) || 0 })
            }
            className="border p-2 rounded"
            hidden= {isStudent}
          />
        </div>

        {/* Feedback */}
        <div className="flex flex-col mb-4">
          <label htmlFor="feedback" className="font-semibold mb-1">
            Feedback
          </label>
          <textarea
            id="feedback"
            value={participation.feedback}
            onChange={(e) => setParticipation({ ...participation, feedback: e.target.value })}
            className="border p-2 rounded"
            rows="3"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Participation"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default AddParticipation;
