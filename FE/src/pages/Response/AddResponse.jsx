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
    optionID: 0,
    responseText: "",
  });

  const [participations, setParticipations] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [allOptions, setAllOptions] = useState([]); // Store all options
  const [filteredOptions, setFilteredOptions] = useState([]); // Store filtered options for selected QuestionID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch questions and options
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ParticipationRes = await axios.get(`${apiUrl}/Participation/all`, {
          headers: getAuthHeaders(),
        });
        setParticipations(ParticipationRes.data);
        const QuestionRes = await axios.get(`${apiUrl}/SurveyQuestion/all`, {
          headers: getAuthHeaders(),
        });
        setQuestions(QuestionRes.data);
        const OptionRes = await axios.get(`${apiUrl}/SurveyOption/all`, {
          headers: getAuthHeaders(),
        });
        setAllOptions(OptionRes.data); // Store all options
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl]);

  // Filter options when the QuestionID changes
  useEffect(() => {
    if (response.questionID !== 0) {
      const filtered = allOptions.filter(
        (option) => option.questionID === response.questionID
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]); // Clear options if no QuestionID is selected
    }
  }, [response.questionID, allOptions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const apiResponse = await axios.post(`${apiUrl}/Response/create`, response, {
        headers: getAuthHeaders(),
      });

      if (apiResponse.status === 201 || apiResponse.status === 200) {
        alert("Response created successfully!");
        navigate("/response-list");
      }
    } catch (err) {
      console.error("Error adding response:", err);
      if (err.response) {
        setError(err.response.data.message || "Failed to create response.");
      } else {
        setError("Failed to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Add Response</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-md rounded">
        <div className="flex flex-col mb-4">
          <label htmlFor="participationID" className="font-semibold mb-1">
            Participation ID
          </label>
          <select
            id="participationID"
            value={response.participationID}
            onChange={(e) => setResponse({ ...response, participationID: parseInt(e.target.value)})}
            className="border p-2 rounded"
            required
          >
            <option value={0}>-- Select Question --</option>
            {participations.map((p) => (
              <option key={p.participationID} value={p.participationID}>
                {p.participationID}
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
            onChange={(e) => setResponse({ ...response, questionID: parseInt(e.target.value), optionID: 0 })}
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
            required
            disabled={filteredOptions.length === 0} // Disable if no options are available
          >
            <option value={0}>-- Select Option --</option>
            {filteredOptions.map((o) => (
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

         {/* Submit Button */}
         <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Response"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default AddResponse;
