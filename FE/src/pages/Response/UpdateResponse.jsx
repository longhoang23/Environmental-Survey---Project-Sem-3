import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth";

const UpdateResponse = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // Backend API base URL
  const { id } = useParams(); // Get response ID from route params
  const navigate = useNavigate();

  const [response, setResponse] = useState({
    participationID: 0,
    questionID: 0,
    optionID: 0, // Ensure default is 0
    responseText: "",
  });

  const [participations, setParticipations] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]); // For selectable options
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [participationRes, questionRes, optionRes] = await Promise.all([
          axios.get(`${apiUrl}/Participation/all`),
          axios.get(`${apiUrl}/SurveyQuestion/all`),
          axios.get(`${apiUrl}/SurveyOption/all`), // Fetch all options
        ]);
        setParticipations(participationRes.data);
        setQuestions(questionRes.data);
        setOptions(optionRes.data);

        const responseRes = await axios.post(`${apiUrl}/Response/${id}`, response, {
          headers: getAuthHeaders(),
        });
        if (responseRes.status === 200) {
         setResponse(responseRes.data);
         setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const updateRes = await axios.put(`${apiUrl}/Response/update/${id}`, response, {
        headers: { "Content-Type": "application/json" },
        headers: getAuthHeaders(),
      });

      if (updateRes.status === 200) {
        alert("Response updated successfully!");
        navigate("/response-list");
      }
    } catch (err) {
      console.error("Error updating response:", err);
      setError("Failed to update response.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Update Response</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-md rounded">

        <div className="flex flex-col mb-4">
          <label htmlFor="participationID" className="font-semibold mb-1">Participation</label>
          <select
            id="participationID"
            value={response.participationID}
            onChange={(e) =>
              setResponse({ ...response, participationID: parseInt(e.target.value) })
            }
            className="border p-2 rounded"
          >
            <option value={0}>-- Select Participation --</option>
            {participations.map((p) => (
              <option key={p.participationID} value={p.participationID}>
                {p.participationDate}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="questionID" className="font-semibold mb-1">Question</label>
          <select
            id="questionID"
            value={response.questionID}
            onChange={(e) => setResponse({ ...response, questionID: parseInt(e.target.value) })}
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

        <div className="flex flex-col mb-4">
          <label htmlFor="optionID" className="font-semibold mb-1">Option</label>
          <select
            id="optionID"
            value={response.optionID}
            onChange={(e) => setResponse({ ...response, optionID: parseInt(e.target.value) })}
            className="border p-2 rounded"
          >
            <option value={0}>-- Select Option --</option>
            {options.map((opt) => (
              <option key={opt.optionID} value={opt.optionID}>
                {opt.optionText}
              </option>
            ))}
          </select>
        </div>

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

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Update Response
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateResponse;
