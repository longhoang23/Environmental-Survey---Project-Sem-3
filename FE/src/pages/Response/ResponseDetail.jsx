import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ResponseDetail = () => {
  const { id } = useParams(); // Response ID
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const navigate = useNavigate();

  const [response, setResponse] = useState(null);
  const [optionText, setOptionText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Response/${id}`);
        setResponse(response.data);

        // If OptionID exists, fetch the associated option text
        if (response.data.optionID && response.data.optionID !== 0) {
          const optionResponse = await axios.get(`${apiUrl}/SurveyOption/${response.data.optionID}`);
          setOptionText(optionResponse.data.optionText);
        }
      } catch (err) {
        console.error("Error fetching response details:", err);
        setError("Failed to load response details.");
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
      <h2 className="text-2xl font-bold mb-4">Response Detail</h2>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto">
        <p><strong>Response ID:</strong> {response.responseID}</p>
        <p><strong>Participation ID:</strong> {response.participationID}</p>
        <p><strong>Question ID:</strong> {response.questionID}</p>
        {response.optionID && response.optionID !== 0 ? (
          <p><strong>Option:</strong> {optionText}</p>
        ) : (
          <p><strong>Response Text:</strong> {response.responseText || "N/A"}</p>
        )}
        <button
          onClick={() => navigate("/response/list")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default ResponseDetail;
