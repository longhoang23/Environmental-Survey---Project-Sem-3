import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddResponse = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // e.g., http://localhost:5169/api
  const navigate = useNavigate();

  const [response, setResponse] = useState({
    participationID: 0,
    questionID: 0,
    optionID: null,
    responseText: "",
  });

  const [participations, setParticipations] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch participations and questions on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const participationRes = await axios.get(`${apiUrl}/Participation/all`);
        const questionRes = await axios.get(`${apiUrl}/SurveyQuestion/all`);
        setParticipations(participationRes.data);
        setQuestions(questionRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
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
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        alert("Response created successfully!");
        navigate("/admin/response-list");
      }
    } catch (err) {
      console.error("Error creating response:", err);
      setError("Failed to create response. Please try again.");
    }
  };

  if (loading) return <div>Loading data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Add Response</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded space-y-4">
        {/* ParticipationID */}
        <div className="flex flex-col">
          <label htmlFor="participationID" className="font-semibold mb-1">Participation</label>
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
                Participation {p.participationID}
              </option>
            ))}
          </select>
        </div>

        {/* QuestionID */}
        <div className="flex flex-col">
          <label htmlFor="questionID" className="font-semibold mb-1">Question</label>
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

        {/* OptionID */}
        <div className="flex flex-col">
          <label htmlFor="optionID" className="font-semibold mb-1">Option</label>
          <input
            id="optionID"
            type="number"
            value={response.optionID || ""}
            onChange={(e) => setResponse({ ...response, optionID: e.target.value ? parseInt(e.target.value) : null })}
            className="border p-2 rounded"
            placeholder="Enter Option ID (if applicable)"
          />
        </div>

        {/* ResponseText */}
        <div className="flex flex-col">
          <label htmlFor="responseText" className="font-semibold mb-1">Response Text</label>
          <textarea
            id="responseText"
            value={response.responseText}
            onChange={(e) => setResponse({ ...response, responseText: e.target.value })}
            className="border p-2 rounded"
            placeholder="Enter response text"
          ></textarea>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default AddResponse;
