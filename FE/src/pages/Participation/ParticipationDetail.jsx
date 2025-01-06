import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ParticipationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;

  const [participation, setParticipation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParticipation = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Participation/${id}`);
        setParticipation(response.data);
      } catch (err) {
        setError("Failed to load participation.");
      } finally {
        setLoading(false);
      }
    };
    fetchParticipation();
  }, [id, apiUrl]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Participation Details</h2>
      <div className="bg-white shadow-md rounded p-4">
        <p><strong>User ID:</strong> {participation.userID}</p>
        <p><strong>Survey ID:</strong> {participation.surveyID}</p>
        <p><strong>Participation Date:</strong> {participation.participationDate ? participation.participationDate.slice(0, 10) : ""}</p>
        <p><strong>Total Score:</strong> {participation.totalScore}</p>
        <p><strong>Feedback:</strong> {participation.feedback}</p>
        <button
          onClick={() => navigate("/participation-list")}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default ParticipationDetail;
