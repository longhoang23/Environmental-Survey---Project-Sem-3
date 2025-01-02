import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const QuestionDetail = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDetailButton = (id) => {
    navigate(`/admin/option-detail/${id}`);
  };
  
  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/SurveyQuestion/${id}`);
        setQuestion(response.data);
      } catch (err) {
        console.error("Error fetching Question:", err);
        setError("Failed to load Question details.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [apiUrl, id]);

  if (loading) {
    return <div>Loading Question details...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!question) {
    return <div>No Question data found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Question Details</h1>
      <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
        <p>
          <strong>Question ID:</strong> {question.questionID}
        </p>
        <p>
          <strong>Survey ID:</strong> {question.surveyID}
        </p>
        <p>
          <strong>Question Text:</strong> {question.questionText}
        </p>
        <p>
          <strong>Question Type:</strong> {question.questionType}
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/admin/questions")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Question List
          </button>
        </div>
      </div>

      {/* List of Options */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-center">Survey Options</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {question.options.map((option) => (
          <div
            key={option.optionID}
            className="relative p-4 bg-white shadow rounded border border-gray-200"
          >
            <h3 className="text-lg font-medium mb-2">Option: {option.optionText}</h3>
            <p className="text-sm text-gray-700">Score: {option.score}</p>
            <button
              onClick={() => handleDetailButton(option.optionID)}
              className="absolute bottom-4 right-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionDetail;
