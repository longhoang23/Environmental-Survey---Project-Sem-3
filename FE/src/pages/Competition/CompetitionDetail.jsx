import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CompetitionDetail = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // e.g., http://localhost:5169/api
  const { id } = useParams(); // Competition ID from route
  const navigate = useNavigate();

  const [competition, setCompetition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompetition = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/Competition/${id}`);
        setCompetition(response.data);
      } catch (err) {
        console.error("Error fetching competition:", err);
        setError("Failed to load competition details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompetition();
  }, [apiUrl, id]);

  if (loading) {
    return <div>Loading competition details...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!competition) {
    return <div>No competition data found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Competition Details</h1>
      <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
        <p>
          <strong>Competition ID:</strong> {competition.competitionID}
        </p>
        <p>
          <strong>Title:</strong> {competition.title}
        </p>
        <p>
          <strong>Description:</strong> {competition.description}
        </p>
        <p>
          <strong>Prize Details:</strong> {competition.prizeDetails}
        </p>
        <p>
          <strong>Winner 1:</strong> {competition.winner1 || "None"}
        </p>
        <p>
          <strong>Winner 2:</strong> {competition.winner2 || "None"}
        </p>
        <p>
          <strong>Winner 3:</strong> {competition.winner3 || "None"}
        </p>
        <button
          onClick={() => navigate("/competition-list")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Competition List
        </button>
      </div>
    </div>
  );
};

export default CompetitionDetail;
