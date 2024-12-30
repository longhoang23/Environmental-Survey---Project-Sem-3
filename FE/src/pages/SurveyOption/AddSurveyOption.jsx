import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddOption = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const [option, setOption] = useState({
    questionID: "",
    optionText: "",
    score: 0,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/SurveyOption/create`, option, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201 || response.status === 200) {
        alert("Option added successfully!");
        navigate("/admin/options");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding Option");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-6 py-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-5 text-center">Add Option</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="questionID"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Question ID:
          </label>
          <input
            type="text"
            id="questionID"
            name="questionID"
            value={option.questionID}
            onChange={(e) => setOption({ ...option, questionID: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="optionText"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Option Text:
          </label>
          <textarea
            id="optionText"
            name="optionText"
            value={option.optionText}
            onChange={(e) => setOption({ ...option, optionText: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="score"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Score:
          </label>
          <input
            type="number"
            id="score"
            name="score"
            value={option.score}
            onChange={(e) => setOption({ ...option, score: Number(e.target.value) })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Option
        </button>
      </form>
    </div>
  );
};

export default AddOption;
