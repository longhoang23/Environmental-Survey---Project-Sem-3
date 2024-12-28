import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSurvey = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const { id } = useParams();

  const [survey, setSurvey] = useState({ 
    title: "",
    description: "",
    targetAudience: "",
    startDate: "",
    endDate: "",
    isActive: true, 
  });

  const [initialDates, setInitialDates] = useState({
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Survey/${id}`);
        if (response.status === 200) {
          setSurvey(response.data);
          setInitialDates({
            startDate: response.data.startDate,
            endDate: response.data.endDate,
          });
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching Survey:", err);
        setError("Failed to fetch Survey data");
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [apiUrl, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${apiUrl}/Survey/update/${id}`,
        survey,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Survey updated successfully!");
        navigate("/admin/surveys");
      }
    } catch (err) {
      console.error("Error updating Survey:", err);
      setError("Failed to update Survey");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl font-semibold">Loading Survey data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 px-6 py-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-5 text-center">
        Update Survey (ID: {id})
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={survey.title || ""}
            onChange={(e) => setSurvey({ ...survey, title: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={survey.description || ""}
            onChange={(e) => setSurvey({ ...survey, description: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="targetAudience"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Target Audience:
          </label>
          <input
            type="text"
            id="targetAudience"
            name="targetAudience"
            value={survey.targetAudience || ""}
            onChange={(e) => setSurvey({ ...survey, targetAudience: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={survey.startDate || ""}
            onChange={(e) => setSurvey({ ...survey, startDate: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
          />
          <p className="text-sm text-gray-500 mt-1">
            Original Start Date: {initialDates.startDate || "N/A"}
          </p>
        </div>

        <div className="mb-5">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={survey.endDate || ""}
            onChange={(e) => setSurvey({ ...survey, endDate: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
          />
          <p className="text-sm text-gray-500 mt-1">
            Original End Date: {initialDates.endDate || "N/A"}
          </p>
        </div>
        
        <div className="mb-5">
          <label
            htmlFor="isActive"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Is Active:
          </label>
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={survey.isActive || false}
            onChange={(e) => setSurvey({ ...survey, isActive: e.target.checked })}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Update Survey
        </button>

        {error && <p className="mt-3 text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateSurvey;


/*
<div className="max-w-md mx-auto mt-10 px-6 py-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-5 text-center">
        Update Survey (ID: {id})
      </h2>

      

        <div className="mb-5">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={survey.startDate || ""}
            onChange={(e) => setSurvey({ ...survey, startDate: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={survey.endDate || ""}
            onChange={(e) => setSurvey({ ...survey, endDate: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
          />
        </div>

        
*/