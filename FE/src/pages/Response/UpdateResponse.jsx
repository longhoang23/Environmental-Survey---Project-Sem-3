import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateResponse = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // Backend API base URL
  const { id } = useParams(); // Get response ID from route params
  const navigate = useNavigate();

  const [response, setResponse] = useState({
    participationID: "",
    questionID: 0,
    optionID: 0, // Default to 0
    responseText: "",
  });

  const [participations, setParticipations] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]); // For all options
  const [filteredOptions, setFilteredOptions] = useState([]); // Filtered options based on questionID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data for participations, questions, options, and the specific response
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [participationRes, questionRes, optionRes, responseRes] = await Promise.all([
          axios.get(`${apiUrl}/Participation/all`),
          axios.get(`${apiUrl}/SurveyQuestion/all`),
          axios.get(`${apiUrl}/SurveyOption/all`),
          axios.get(`${apiUrl}/Response/${id}`), // Use GET method for fetching
        ]);

        setParticipations(participationRes.data);
        setQuestions(questionRes.data);
        setOptions(optionRes.data);
        setResponse(responseRes.data);

        // Filter options for the initial questionID
        const initialFilteredOptions = optionRes.data.filter(
          (opt) => opt.questionID === responseRes.data.questionID
        );
        setFilteredOptions(initialFilteredOptions);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, apiUrl]);

  // Handle question change and filter options dynamically
  const handleQuestionChange = (e) => {
    const questionID = parseInt(e.target.value);
    setResponse({ ...response, questionID, optionID: 0 }); // Reset optionID
    const filtered = options.filter((opt) => opt.questionID === questionID);
    setFilteredOptions(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

     // Validate ParticipationID
     if (!response.participationID || response.participationID.trim() === "") {
      setError("Participation ID is required.");
      setLoading(false);
      return;
    }

    try {
      const updateRes = await axios.put(`${apiUrl}/Response/update/${id}`, response);

      if (updateRes.status === 200) {
        alert("Response updated successfully!");
        navigate("/response-list");
      }
    } catch (err) {
      console.error("Error updating response:", err);
      setError(
        err.response && err.response.status === 404
          ? "Failed to update response. Participation ID does not exist."
          : "Failed to update response. Please try again later."
      );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Update Response</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-md rounded">

        {/* Participation ID */}
        <div className="mb-5">
          <label
            htmlFor="participationID"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Participation ID:
          </label>
          <input
            type="text"
            id="participationID"
            value={response.participationID}
            onChange={(e) => setResponse({ ...response, participationID: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

          {/* Question */}
          <div className="flex flex-col mb-4">
            <label htmlFor="questionID" className="font-semibold mb-1">Question</label>
            <select
              id="questionID"
              value={response.questionID}
              onChange={handleQuestionChange}
              className="border p-2 rounded"
            >
              <option value={0}>-- Select Question --</option>
              {questions.map((q) => (
                <option key={q.questionID} value={q.questionID}>
                  {q.questionText}
                </option>
              ))}
            </select>
          </div>

          {/* Option */}
          <div className="flex flex-col mb-4">
            <label htmlFor="optionID" className="font-semibold mb-1">Option</label>
            <select
              id="optionID"
              value={response.optionID}
              onChange={(e) => setResponse({ ...response, optionID: parseInt(e.target.value) })}
              className="border p-2 rounded"
            >
              <option value={0}>-- Select Option --</option>
              {filteredOptions.map((opt) => (
                <option key={opt.optionID} value={opt.optionID}>
                  {opt.optionText}
                </option>
              ))}
            </select>
          </div>

          {/* Response Text */}
          <div className="flex flex-col mb-4">
            <label htmlFor="responseText" className="font-semibold mb-1">Response Text</label>
            <textarea
              id="responseText"
              value={response.responseText}
              onChange={(e) => setResponse({ ...response, responseText: e.target.value })}
              className="border p-2 rounded"
              placeholder="Enter response text"
            ></textarea>
          </div>

           {/* Submit Button */}
         <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Update Response"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
  );
};

export default UpdateResponse;
