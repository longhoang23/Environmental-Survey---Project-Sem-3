import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const SeminarDetail = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // e.g. http://localhost:5169/api
  const { id } = useParams(); // Seminar ID from route
  const navigate = useNavigate();

  const [seminar, setSeminar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch seminar details on mount
  useEffect(() => {
    const fetchSeminar = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/Seminar/${id}`);
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

  if (loading) {
    return <div>Loading seminar details...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!seminar) {
    return <div>No seminar data found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Seminar Details</h1>
      <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
        <p>
          <strong>Seminar ID:</strong> {seminar.seminarID}
        </p>
        <p>
          <strong>Conducted By (ID):</strong> {seminar.conductedBy}
        </p>
        <p>
          <strong>Location:</strong> {seminar.location}
        </p>
        <p>
          <strong>Date:</strong> {seminar.date ? seminar.date.slice(0, 10) : ""}
        </p>
        <p>
          <strong>Participants Count:</strong> {seminar.participantsCount}
        </p>
        <p>
          <strong>Description:</strong> {seminar.description}
        </p>
        <button
          onClick={() => navigate("/seminar-list")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Seminar List
        </button>
      </div>
    </div>
  );
};

export default SeminarDetail;
