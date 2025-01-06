import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth"; // Assuming you have this utility

const UpdateFaq = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const { id } = useParams();

  const [faq, setFaq] = useState({ 
    question: "",
    answer: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Faq/${id}`,{
          headers: getAuthHeaders(),
        });
        if (response.status === 200) {
          setFaq(response.data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching Faq:", err);
        setError("Failed to fetch Faq data");
        setLoading(false);
      }
    };

    fetchFaq();
  }, [apiUrl, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${apiUrl}/Faq/update/${id}`,
        faq,
        {
          headers: getAuthHeaders(),
        }
      );
      if (response.status === 200) {
        alert("Faq updated successfully!");
        navigate("/faqs");
      }
    } catch (err) {
      console.error("Error updating Faq:", err);
      setError("Failed to update Faq");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl font-semibold">Loading Faq data...</div>
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
        Update Faq (ID: {id})
      </h2>
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
            value={faq.question || ""}
            onChange={(e) => setFaq({ ...faq, question: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
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
            value={faq.answer || ""}
            onChange={(e) => setFaq({ ...faq, answer: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Update Faq
        </button>

        {error && <p className="mt-3 text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateFaq;
