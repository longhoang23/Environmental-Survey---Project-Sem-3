import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const SurveyDetail = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleDetailButton = (questionID) => {
    navigate(`/question-detail/${questionID}`);
  };

  useEffect(() => {
    const fetchSurvey = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/Survey/${id}`);
        setSurvey(response.data);
      } catch (err) {
        console.error("Error fetching Survey:", err);
        setError("Failed to load Survey details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [apiUrl, id]);

  if (loading) {
    return <div>Loading Survey details...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!survey) {
    return <div>No Survey data found.</div>;
  }

  const totalPages = Math.ceil(survey.surveyQuestions.length / itemsPerPage);
  const currentQuestions = survey.surveyQuestions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Survey Details</h1>
      <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
        <p>
          <strong>Survey ID:</strong> {survey.surveyID}
        </p>
        <p>
          <strong>Title:</strong> {survey.title}
        </p>
        <p>
          <strong>Description:</strong> {survey.description}
        </p>
        <p>
          <strong>Target Audience:</strong> {survey.targetAudience}
        </p>
        <p>
          <strong>Start Date:</strong>{" "}
          {survey.startDate ? survey.startDate.slice(0, 10) : ""}
        </p>
        <p>
          <strong>End Date:</strong>{" "}
          {survey.endDate ? survey.endDate.slice(0, 10) : ""}
        </p>
        <p>
          <strong>Is Active:</strong> {survey.isActive ? "true" : "false"}
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/surveys")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Survey List
          </button>
        </div>
      </div>

      {/* List of Questions */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-center">
        Survey Questions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentQuestions.map((question) => (
          <div
            key={question.questionID}
            className="p-4 bg-white shadow rounded border border-gray-200 relative"
          >
            <h3 className="text-lg font-medium mb-2">
              Question: {question.questionText}
            </h3>
            <p className="text-sm text-gray-700">
              Type: {question.questionType}
            </p>
            <button
              onClick={() => handleDetailButton(question.questionID)}
              className="absolute bottom-4 right-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SurveyDetail;
