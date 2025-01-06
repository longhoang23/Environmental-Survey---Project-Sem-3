import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth";

const AddResponse = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const navigate = useNavigate();

  const [response, setResponse] = useState({
    participationID: 0,
    questionID: 0,
    optionID: 0, // Default to 0
    responseText: "",
  });

  const [participations, setParticipations] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch participations, questions, and options
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [participationResponse, questionResponse, optionResponse] = await Promise.all([
          axios.get(`${apiUrl}/Participation/all`),
          axios.get(`${apiUrl}/SurveyQuestion/all`),
          axios.get(`${apiUrl}/SurveyOption/all`),
        ]);
        setParticipations(participationResponse.data);
        setQuestions(questionResponse.data);
        setOptions(optionResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(`${apiUrl}/Response/create`, response, {
        headers: { "Content-Type": "application/json" },
        headers: getAuthHeaders(),
      });
      if (response.status === 201 || response.status === 200) {
        alert("Response added successfully!");
        navigate("/response-list");
      }
    } catch (err) {
      console.error("Error adding response:", err);
      setError("Failed to add response.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Add Response</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-md rounded">

        {/* Participation */}
        <div className="flex flex-col mb-4">
          <label htmlFor="participationID" className="font-semibold mb-1">
            Participation
          </label>
          <select
            id="participationID"
            value={response.participationID}
            onChange={(e) => setResponse({ ...response, participationID: parseInt(e.target.value) })}
            className="border p-2 rounded"
            required
          >
            <option value={0}>-- Select Participation --</option>
            {participations.map((p) => (
              <option key={p.participationID} value={p.participationID}>
                {p.participationDate}
              </option>
            ))}
          </select>
        </div>

        {/* Question */}
        <div className="flex flex-col mb-4">
          <label htmlFor="questionID" className="font-semibold mb-1">
            Question
          </label>
          <select
            id="questionID"
            value={response.questionID}
            onChange={(e) => setResponse({ ...response, questionID: parseInt(e.target.value) })}
            className="border p-2 rounded"
            required
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
          <label htmlFor="optionID" className="font-semibold mb-1">
            Option
          </label>
          <select
            id="optionID"
            value={response.optionID}
            onChange={(e) => setResponse({ ...response, optionID: parseInt(e.target.value) })}
            className="border p-2 rounded"
          >
            <option value={0}>-- Select Option --</option>
            {options.map((o) => (
              <option key={o.optionID} value={o.optionID}>
                {o.optionText}
              </option>
            ))}
          </select>
        </div>

        {/* Response Text */}
        <div className="flex flex-col mb-4">
          <label htmlFor="responseText" className="font-semibold mb-1">
            Response Text
          </label>
          <input
            id="responseText"
            type="text"
            value={response.responseText}
            onChange={(e) => setResponse({ ...response, responseText: e.target.value })}
            className="border p-2 rounded"
            placeholder="Enter response text"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Response
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default AddResponse;
