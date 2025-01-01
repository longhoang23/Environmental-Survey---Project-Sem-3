import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth"; // Assuming you have this utility

const AddQuestion = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const [question, setQuestion] = useState({
    surveyID: "",
    questionText: "",
    questionType: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/SurveyQuestion/create`, question, {
        headers: getAuthHeaders(),
      });

      if (response.status === 201 || response.status === 200) {
        alert("Question added successfully!");
        navigate("/admin/questions");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding question");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-6 py-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-5 text-center">Add Question</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="surveyID"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Survey ID:
          </label>
          <input
            type="text"
            id="surveyID"
            name="surveyID"
            value={question.surveyID}
            onChange={(e) => setQuestion({ ...question, surveyID: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="questionText"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Question Text:
          </label>
          <textarea
            id="questionText"
            name="questionText"
            value={question.questionText}
            onChange={(e) => setQuestion({ ...question, questionText: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="questionType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Question Type:
          </label>
          <input
            type="text"
            id="questionType"
            name="questionType"
            value={question.questionType}
            onChange={(e) => setQuestion({ ...question, questionType: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
