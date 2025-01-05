import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth"; // Assuming you have this utility

const UpdateParticipation = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const [participation, setParticipation] = useState({
    userID: 0,
    surveyID: 0,
    participationDate: "",
    totalScore: 0,
    feedback: "",
  });

  const [initialDates, setInitialDates] = useState({
      participationDate: "",
    });

  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const surveysResponse = await axios.get(`${apiUrl}/Survey/all`, {
          headers: getAuthHeaders(),
        });
        setSurveys(surveysResponse.data);

        const participationResponse = await axios.get(`${apiUrl}/Participation/${id}`, {
          headers: getAuthHeaders(), // Include the authorization headers
        });

        if (participationResponse.status === 200) {
          setParticipation(participationResponse.data); // Set participation data
          setInitialDates({
            participationDate: participationResponse.data.participationDate,
          });
          setLoading(false);
        } else {
          setError("Failed to load participation data."); // Handle non-200 responses
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.put(`${apiUrl}/Participation/update/${id}`, participation, {
          headers: getAuthHeaders(),
      });
      if (response.status === 200) {
        alert("Participation updated successfully!");
        navigate("/participation-list");
      }
    } catch (err) {
      console.error("Error updating participation:", err);
      setError("Failed to update participation.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Update Participation (ID: {id})</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-4 bg-white p-6 shadow-md rounded"
      >
        {/* Conducted By */}
        <div className="flex flex-col">
          <label htmlFor="userID" className="font-semibold mb-1">
            User ID
          </label>
          <input
            id="userID"
            type="number"
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
            value={participation.participationDate || ""}
            onChange={(e) =>
              setParticipation({ ...participation, participationDate: e.target.value })
            }
            className="border p-2 rounded"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Original Participation Date: {initialDates.participationDate || "N/A"}
          </p>
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
          {loading ? "Submitting..." : "Update Participation"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateParticipation;
