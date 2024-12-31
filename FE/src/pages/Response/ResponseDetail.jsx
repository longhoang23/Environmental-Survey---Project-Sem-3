import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResponseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Response/${id}`);
        setResponse(response.data);
      } catch (err) {
        setError("Failed to load response.");
      } finally {
        setLoading(false);
      }
    };
    fetchResponse();
  }, [id, apiUrl]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Response Details</h2>
      <div className="bg-white shadow-md rounded p-4">
        <p><strong>Participation ID:</strong> {response.participationID}</p>
        <p><strong>Question ID:</strong> {response.questionID}</p>
        <p><strong>Option ID:</strong> {response.optionID}</p>
        <p><strong>Response Text:</strong> {response.responseText}</p>
        <button
          onClick={() => navigate("/response-list")}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default ResponseDetail;
