import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth"; // Assuming you have this utility

const UpdateQuestion = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const { id } = useParams();

  const [question, setQuestion] = useState({
    surveyID: "",
    questionText: "",
    questionType: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`${apiUrl}/SurveyQuestion/${id}`, {
          headers: getAuthHeaders(),
        });
        if (response.status === 200) {
          setQuestion(response.data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching Question:", err);
        setError("Failed to fetch Question data");
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [apiUrl, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${apiUrl}/SurveyQuestion/update/${id}`,
        question,
        {
          headers: getAuthHeaders(),
        }
      );
      if (response.status === 200) {
        alert("Question updated successfully!");
        navigate("/questions");
      }
    } catch (err) {
      console.error("Error updating Question:", err);
      setError("Failed to update Question");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl font-semibold">Loading Question data...</div>
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
        Update Question (ID: {id})
      </h2>
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
            value={question.surveyID || ""}
            onChange={(e) =>
              setQuestion({ ...question, surveyID: e.target.value })
            }
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
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
            value={question.questionText || ""}
            onChange={(e) =>
              setQuestion({ ...question, questionText: e.target.value })
            }
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
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
            value={question.questionType || ""}
            onChange={(e) =>
              setQuestion({ ...question, questionType: e.target.value })
            }
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Update Question
        </button>

        {error && <p className="mt-3 text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateQuestion;
