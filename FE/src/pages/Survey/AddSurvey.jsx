import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth"; // Assuming you have this utility

const AddSurvey = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const createdBy = currentUser?.userID || 0;

  const [survey, setSurvey] = useState({
    title: "",
    description: "",
    targetAudience: "",
    startDate: "",
    endDate: "",
    createdBy: createdBy,
    isActive: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/Survey/create`, survey, {
        headers: getAuthHeaders(),
      });

      // Check success response (could be 201 Created or 200 OK)
      if (response.status === 201 || response.status === 200) {
        alert("Survey added successfully!");
        // Navigate back to Klass list page
        navigate("/surveys");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding Survey");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-6 py-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-5 text-center">Add Survey</h2>

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
            value={survey.title}
            onChange={(e) => setSurvey({ ...survey, title: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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
            value={survey.description}
            onChange={(e) =>
              setSurvey({ ...survey, description: e.target.value })
            }
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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
            value={survey.targetAudience}
            onChange={(e) =>
              setSurvey({ ...survey, targetAudience: e.target.value })
            }
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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
            value={survey.startDate}
            onChange={(e) =>
              setSurvey({ ...survey, startDate: e.target.value })
            }
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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
            value={survey.endDate}
            onChange={(e) => setSurvey({ ...survey, endDate: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="createdBy"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Created by:
          </label>
          <input
            type="number"
            id="createdBy"
            readOnly
            value={survey.createdBy}
            onChange={(e) =>
              setSurvey({ ...survey, createdBy: e.target.value })
            }
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
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
            checked={survey.isActive}
            onChange={(e) =>
              setSurvey({ ...survey, isActive: e.target.checked })
            }
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Survey
        </button>
      </form>
    </div>
  );
};

export default AddSurvey;
