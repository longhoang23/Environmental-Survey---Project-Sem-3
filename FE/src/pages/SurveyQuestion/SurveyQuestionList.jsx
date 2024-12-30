import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SurveyQList = () => {
  const [surveyQuestions, setSurveyQuestion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const navigate = useNavigate();

  const handleAddButton = () => {
    navigate("/admin/add-question");
  };

  const handleDetailButton = (id) => {
    navigate(`/admin/question-detail/${id}`);
  };


  const handleUpdateButton = (id) => {
    navigate(`/admin/update-question/${id}`);
  };

  const handleDeleteButton = async (id) => {
    const confirmDelete = window.confirm(`Do you want to delete id: ${id}`);
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(`${apiUrl}/SurveyQuestion/delete/${id}`);
      if (response.status === 200) {
        setSurveyQuestion(surveyQuestions.filter((surveyQ) => surveyQ.questionID !== id));
        alert("Survey Question deleted successfully!");
      }
    } catch (error) {
      console.error("There was an error deleting the Survey Question:", error);
      alert("Failed to delete Survey Question");
    }
  };

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await axios.get(`${apiUrl}/SurveyQuestion/all`);
        setSurveyQuestion(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load Survey Question");
        setLoading(false);
      }
    };
    fetchSurvey();
  }, [apiUrl]);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Survey Question List</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                QuestionID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                SurveyID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Question Text
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Question Type
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {surveyQuestions.length > 0 ? (
              surveyQuestions.map((surveyQ) => (
                <tr key={surveyQ.questionID} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {surveyQ.questionID}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {surveyQ.surveyID}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {surveyQ.questionText}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {surveyQ.questionType}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <button
                      onClick={() => handleDetailButton(surveyQ.questionID)}
                      className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleUpdateButton(surveyQ.questionID)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteButton(surveyQ.questionID)}
                      className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No Survey Question Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={handleAddButton}
          className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
        >
          Add Survey Question
        </button>
      </div>
    </div>
  );
};

export default SurveyQList;
