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

  const [users, setUsers] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Users data
        const usersResponse = await axios.get(`${apiUrl}/Student/all`);
        setUsers(usersResponse.data);
        //Fetch Surveys data
        const surveysResponse = await axios.get(`${apiUrl}/Survey/all`);
        setSurveys(surveysResponse.data);
         // Fetch Participation data with authorization
        const participationResponse = await axios.get(`${apiUrl}/Participation/${id}`, {
          headers: getAuthHeaders(), // Include the authorization headers
        });

        if (participationResponse.status === 200) {
          setParticipation(participationResponse.data); // Set participation data
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

    if (!participation.participationDate) {
      setError("Participation date is required.");
      setLoading(false);
      return;
    }

    const selectedUser = users.find((user) => user.userID === participation.userID);
    if (!selectedUser || !selectedUser.isActive) {
      setError("Selected user is inactive and cannot participate.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(`${apiUrl}/Participation/update/${id}`, participation, {
          headers: getAuthHeaders(),
      });
      if (response.status === 200) {
        alert("Participation updated successfully!");
        navigate("/admin/participation-list");
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
      <h2 className="text-2xl font-bold mb-4">Update Participation</h2>
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
            {users
            .filter((user) => user.isActive) // Only include active users
            .map((user) => (
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
          <label htmlFor="participationDate" className="font-semibold mb-1">
            Participation Date
          </label>
          <input
            id="participationDate"
            type="datetime-local"
            value={participation.participationDate}
            onChange={(e) =>
              setParticipation({ ...participation, participationDate: e.target.value })
            }
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col mb-4">
        <label htmlFor="totalScore" className="font-semibold mb-1">Total Score</label>
        <input
          id="totalScore"
          type="number"
          value={participation.totalScore} // Default to 0 if the value is null
          onChange={(e) => setParticipation({ ...participation, totalScore: parseInt(e.target.value) || 0 })}
          className="border p-2 rounded"
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
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Update Participation
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateParticipation;
