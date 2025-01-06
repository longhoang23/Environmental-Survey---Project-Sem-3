import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth"; // Assuming you have this utility

const SurveyOList = () => {
  const [surveyOptions, setSurveyOption] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const navigate = useNavigate();

  const handleAddButton = () => {
    navigate("/add-option");
  };

  const handleDetailButton = (id) => {
    navigate(`/option-detail/${id}`);
  };

  const handleUpdateButton = (id) => {
    navigate(`/update-option/${id}`);
  };

  const handleDeleteButton = async (id) => {
    const confirmDelete = window.confirm(`Do you want to delete id: ${id}`);
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(`${apiUrl}/SurveyOption/delete/${id}`,{
        headers: getAuthHeaders(),
      });
      if (response.status === 200) {
        setSurveyOption(
          surveyOptions.filter((surveyO) => surveyO.optionID !== id)
        );
        alert("Survey Option deleted successfully!");
      }
    } catch (error) {
      console.error("There was an error deleting the Survey Option:", error);
      alert("Failed to delete Survey Option");
    }
  };
  const userRole = JSON.parse(localStorage.getItem("user")).role;
  const isStudent = userRole == 3;

  useEffect(() => {
    const fetchOption = async () => {
      try {
        const response = await axios.get(`${apiUrl}/SurveyOption/all`);
        setSurveyOption(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load Survey Option");
        setLoading(false);
      }
    };
    fetchOption();
  }, [apiUrl]);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Survey Option List
      </h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Option ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Question ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Option Text
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600"
              hidden = {isStudent}>
                Score
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {surveyOptions.length > 0 ? (
              surveyOptions.map((surveyO) => (
                <tr
                  key={surveyO.optionID}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {surveyO.optionID}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {surveyO.questionID}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {surveyO.optionText}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700"
                  hidden = {isStudent}>
                    {surveyO.score}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <button
                      onClick={() => handleDetailButton(surveyO.optionID)}
                      className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleUpdateButton(surveyO.questionID)}
                      className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                      hidden = {isStudent}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteButton(surveyO.questionID)}
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
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No Survey Option Available
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
          Add Survey Option
        </button>
      </div>
    </div>
  );
};

export default SurveyOList;
