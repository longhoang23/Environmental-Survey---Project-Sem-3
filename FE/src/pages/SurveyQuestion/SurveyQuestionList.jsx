import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth"; // Assuming you have this utility

const SurveyQList = () => {
  const [surveyQuestions, setSurveyQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchText, setSearchText] = useState(""); // Search by question text
  const [searchType, setSearchType] = useState(""); // Search by question type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const navigate = useNavigate();

  const handleAddButton = () => {
    navigate("/add-question");
  };

  const handleDetailButton = (id) => {
    navigate(`/question-detail/${id}`);
  };

  const handleUpdateButton = (id) => {
    navigate(`/update-question/${id}`);
  };

  const handleDeleteButton = async (id) => {
    const confirmDelete = window.confirm(`Do you want to delete id: ${id}`);
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(`${apiUrl}/SurveyQuestion/delete/${id}`, {
        headers: getAuthHeaders(),
      });
      if (response.status === 200) {
        setSurveyQuestions(surveyQuestions.filter((surveyQ) => surveyQ.questionID !== id));
        setFilteredQuestions(filteredQuestions.filter((surveyQ) => surveyQ.questionID !== id));
        alert("Survey Question deleted successfully!");
      }
    } catch (error) {
      console.error("There was an error deleting the Survey Question:", error);
      alert("Failed to delete Survey Question");
    }
  };
  const userRole = JSON.parse(localStorage.getItem("user")).role;
  const isStudent = userRole == 3;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${apiUrl}/SurveyQuestion/all`);
        setSurveyQuestions(response.data);
        setFilteredQuestions(response.data); // Initialize filteredQuestions
        setLoading(false);
      } catch (err) {
        setError("Failed to load Survey Questions");
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [apiUrl]);

  useEffect(() => {
    const filtered = surveyQuestions.filter((q) => 
      q.questionText.toLowerCase().includes(searchText.toLowerCase()) &&
      q.questionType.toLowerCase().includes(searchType.toLowerCase())
    );
    setFilteredQuestions(filtered);
  }, [searchText, searchType, surveyQuestions]);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Survey Question List</h1>

      {/* Search Bars */}
      <div className="mb-4 flex flex-wrap justify-center space-x-4">
        <input
          type="text"
          placeholder="Search by Question Text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <input
          type="text"
          placeholder="Search by Question Type"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">QuestionID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">SurveyID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Question Text</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Question Type</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((surveyQ) => (
                <tr key={surveyQ.questionID} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">{surveyQ.questionID}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{surveyQ.surveyID}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{surveyQ.questionText}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{surveyQ.questionType}</td>
                  <td className="px-4 py-2 text-sm">
                    <button
                      onClick={() => handleDetailButton(surveyQ.questionID)}
                      className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleUpdateButton(surveyQ.questionID)}
                      className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                      hidden={isStudent}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteButton(surveyQ.questionID)}
                      className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                      hidden = {isStudent}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No Survey Questions Available
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
          hidden = {isStudent}
        >
          Add Survey Question
        </button>
      </div>
    </div>
  );
};

export default SurveyQList;
