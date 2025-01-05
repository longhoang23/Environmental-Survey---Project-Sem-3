import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const OptionDetail = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const [option, setOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOption = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/SurveyOption/${id}`);
        setOption(response.data);
      } catch (err) {
        console.error("Error fetching Option:", err);
        setError("Failed to load Option details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOption();
  }, [apiUrl, id]);

  if (loading) {
    return <div>Loading Option details...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!option) {
    return <div>No Option data found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Option Details</h1>
      <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
        <p>
          <strong>Option ID:</strong> {option.optionID}
        </p>
        <p>
          <strong>Question ID:</strong> {option.questionID}
        </p>
        <p>
          <strong>Option Text:</strong> {option.optionText}
        </p>
        <p>
          <strong>Score:</strong> {option.score}
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/options")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Option List
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptionDetail;
