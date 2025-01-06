import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth"; // Assuming you have this utility

const SurveyOList = () => {
  const [surveyOptions, setSurveyOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchQuestionID, setSearchQuestionID] = useState(""); // Search input for Question ID
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
      const response = await axios.delete(`${apiUrl}/SurveyOption/delete/${id}`, {
        headers: getAuthHeaders(),
      });
      if (response.status === 200) {
        setSurveyOptions(surveyOptions.filter((option) => option.optionID !== id));
        setFilteredOptions(filteredOptions.filter((option) => option.optionID !== id));
        alert("Survey Option deleted successfully!");
      }
    } catch (error) {
      console.error("There was an error deleting the Survey Option:", error);
      alert("Failed to delete Survey Option");
    }
  };

  const userRole = JSON.parse(localStorage.getItem("user")).role;
  const isStudent = userRole === 3;

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(`${apiUrl}/SurveyOption/all`);
        setSurveyOptions(response.data);
        setFilteredOptions(response.data); // Initialize filteredOptions
        setLoading(false);
      } catch (err) {
        setError("Failed to load Survey Options");
        setLoading(false);
      }
    };
    fetchOptions();
  }, [apiUrl]);

  useEffect(() => {
    // Filter options based on the search input
    const filtered = surveyOptions.filter((option) =>
      option.questionID.toString().includes(searchQuestionID)
    );
    setFilteredOptions(filtered);
  }, [searchQuestionID, surveyOptions]);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Survey Option List</h1>

      {/* Search Bar */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by Question ID"
          value={searchQuestionID}
          onChange={(e) => setSearchQuestionID(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Option ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Question ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Option Text</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600" hidden={isStudent}>
                Score
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((surveyO) => (
                <tr key={surveyO.optionID} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">{surveyO.optionID}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{surveyO.questionID}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{surveyO.optionText}</td>
                  <td className="px-4 py-2 text-sm text-gray-700" hidden={isStudent}>
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
                      onClick={() => handleUpdateButton(surveyO.optionID)}
                      className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                      hidden={isStudent}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteButton(surveyO.optionID)}
                      className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                      hidden={isStudent}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No Survey Options Available
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
          hidden={isStudent}
        >
          Add Survey Option
        </button>
      </div>
    </div>
  );
};

export default SurveyOList;
