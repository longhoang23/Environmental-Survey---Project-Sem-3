import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddParticipation = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const navigate = useNavigate();

  const [participation, setParticipation] = useState({
    userID: 0,
    surveyID: 0,
    participationDate: "",
    totalScore: null,
    feedback: "",
  });

  const [users, setUsers] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, surveysResponse] = await Promise.all([
          axios.get(`${apiUrl}/User/all`),
          axios.get(`${apiUrl}/Survey/all`),
        ]);
        setUsers(usersResponse.data);
        setSurveys(surveysResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load users or surveys");
      }
    };
    fetchData();
  }, [apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${apiUrl}/Participation/create`, participation);
      if (response.status === 200 || response.status === 201) {
        alert("Participation created successfully!");
        navigate("/participation/list");
      }
    } catch (err) {
      console.error("Error creating participation:", err);
      setError("Failed to create participation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Add Participation</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-md rounded">
        <div className="flex flex-col mb-4">
          <label htmlFor="userID" className="font-semibold mb-1">User</label>
          <select
            id="userID"
            value={participation.userID}
            onChange={(e) => setParticipation({ ...participation, userID: parseInt(e.target.value) })}
            className="border p-2 rounded"
          >
            <option value={0}>-- Select User --</option>
            {users.map((user) => (
              <option key={user.userID} value={user.userID}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="surveyID" className="font-semibold mb-1">Survey</label>
          <select
            id="surveyID"
            value={participation.surveyID}
            onChange={(e) => setParticipation({ ...participation, surveyID: parseInt(e.target.value) })}
            className="border p-2 rounded"
          >
            <option value={0}>-- Select Survey --</option>
            {surveys.map((survey) => (
              <option key={survey.surveyID} value={survey.surveyID}>
                {survey.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="participationDate" className="font-semibold mb-1">Participation Date</label>
          <input
            id="participationDate"
            type="datetime-local"
            value={participation.participationDate}
            onChange={(e) => setParticipation({ ...participation, participationDate: e.target.value })}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="feedback" className="font-semibold mb-1">Feedback</label>
          <input
            id="feedback"
            type="text"
            value={participation.feedback}
            onChange={(e) => setParticipation({ ...participation, feedback: e.target.value })}
            className="border p-2 rounded"
            placeholder="Enter feedback"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {loading ? "Submitting..." : "Add Participation"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default AddParticipation;
