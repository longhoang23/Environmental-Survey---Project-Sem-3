import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth"; // Assuming you have this utility

const UpdateOption = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const { id } = useParams();

  const [option, setOption] = useState({ 
    questionID: "",
    optionText: "",
    score: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOption = async () => {
      try {
        const response = await axios.get(`${apiUrl}/SurveyOption/${id}`,{
          headers: getAuthHeaders(),
        });
        if (response.status === 200) {
          setOption(response.data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching Option:", err);
        setError("Failed to fetch Option data");
        setLoading(false);
      }
    };

    fetchOption();
  }, [apiUrl, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${apiUrl}/SurveyOption/update/${id}`,
        option,
        {
          headers: getAuthHeaders(),
        }
      );
      if (response.status === 200) {
        alert("Option updated successfully!");
        navigate("/admin/options");
      }
    } catch (err) {
      console.error("Error updating Option:", err);
      setError("Failed to update Option");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl font-semibold">Loading Option data...</div>
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
        Update Option (ID: {id})
      </h2>
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
            value={option.questionID || ""}
            onChange={(e) => setOption({ ...option, questionID: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
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
            value={option.optionText || ""}
            onChange={(e) => setOption({ ...option, optionText: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
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
            value={option.score || 0}
            onChange={(e) => setOption({ ...option, score: Number(e.target.value) })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Update Option
        </button>

        {error && <p className="mt-3 text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateOption;
