import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddFaq = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const [faq, setFaq] = useState({
    question: "",
    answer: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/Faq/create`, faq, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201 || response.status === 200) {
        alert("Faq added successfully!");
        navigate("/admin/faqs");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding Faq");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-6 py-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-5 text-center">Add Faq</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="question"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Question:
          </label>
          <input
            type="text"
            id="question"
            name="question"
            value={faq.question}
            onChange={(e) => setFaq({ ...faq, question: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="answer"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Answer:
          </label>
          <textarea
            id="answer"
            name="answer"
            value={faq.answer}
            onChange={(e) => setFaq({ ...faq, answer: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Faq
        </button>
      </form>
    </div>
  );
};

export default AddFaq;
