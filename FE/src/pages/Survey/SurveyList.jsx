import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth"; // Assuming you have this utility

const SurveyList = () => {
  const [surveys, setSurvey] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const navigate = useNavigate();

  const handleAddButton = () => {
    navigate("/admin/add-survey");
  };

  const handleDetailButton = (id) => {
    navigate(`/admin/survey-detail/${id}`);
  };

  const handleUpdateButton = (id) => {
    navigate(`/admin/update-survey/${id}`);
  };

  const handleDeleteButton = async (id) => {
    const confirmDelete = window.confirm(`Do you want to delete id: ${id}`);
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(`${apiUrl}/Survey/delete/${id}`,{
        headers: getAuthHeaders(),
      });
      if (response.status === 200) {
        setSurvey(surveys.filter((survey) => survey.surveyID !== id));
        alert("Survey deleted successfully!");
      }
    } catch (error) {
      console.error("There was an error deleting the Survey:", error);
      alert("Failed to delete Survey");
    }
  };

  const userRole = JSON.parse(localStorage.getItem('user')).role;
  const isStudent = userRole == 3
  const isAdmin = userRole == 1
  const isStaff = userRole == 2

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Survey/all`);
        setSurvey(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load Survey");
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
      <h1 className="text-3xl font-bold text-center mb-6">Survey List</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                SurveyID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Title
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Description
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Target Audience
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Start Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                End Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Is active
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {surveys.length > 0 ? (
              surveys.map((survey) => (
                <tr key={survey.surveyID} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {survey.surveyID}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {survey.title}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {survey.description}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {survey.targetAudience}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {survey.startDate ? survey.startDate.slice(0, 10) : ""}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {survey.startDate ? survey.startDate.slice(0, 10) : ""}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {survey.isActive == true ? "true" : "false"}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <button
                      onClick={() => handleDetailButton(survey.surveyID)}
                      className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleUpdateButton(survey.surveyID)}
                      className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                      hidden={isStaff || isStudent}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteButton(survey.surveyID)}
                      className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                      hidden={isStaff || isStudent}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => alert(`Join survey feature is not implemented yet for Survey ID: ${survey.surveyID}`)}
                      className="ml-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none"
                      hidden = {isAdmin}
                    >
                      Join Survey
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No Survey Available
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
          hidden={isStaff || isStudent}
        >
          Add Survey
        </button>
      </div>
    </div>
  );
};

export default SurveyList;
