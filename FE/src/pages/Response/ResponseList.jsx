import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResponseList = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // e.g., http://localhost:5169/api
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddButton = () => {
    navigate("/add-response");
  };

  const handleDetailButton = (id) => {
    navigate(`/response-detail/${id}`);
  };

  const handleUpdateButton = (id) => {
    navigate(`/update-response/${id}`);
  };

  const handleDeleteButton = async (id) => {
    if (window.confirm(`Are you sure you want to delete response ID: ${id}?`)) {
      try {
        const response = await axios.delete(`${apiUrl}/Response/delete/${id}`);
        if (response.status === 200) {
          setResponses(responses.filter((r) => r.responseID !== id));
          alert("Response deleted successfully!");
        }
      } catch (err) {
        console.error("Error deleting response:", err);
        alert("Failed to delete response.");
      }
    }
  };

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Response/all`);
        setResponses(response.data);
      } catch (err) {
        console.error("Error fetching responses:", err);
        setError("Failed to load responses.");
      } finally {
        setLoading(false);
      }
    };
    fetchResponses();
  }, [apiUrl]);

  if (loading) return <div>Loading responses...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Response List</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Participation ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Question ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Option ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Response Text</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {responses.length > 0 ? (
              responses.map((response) => (
                <tr key={response.responseID} className="border-b hover:bg-gray-50">
                  <td
                    className="px-4 py-2 text-blue-600 cursor-pointer"
                    onClick={() => handleDetailButton(response.responseID)}
                  >
                    {response.responseID}
                  </td>
                  <td className="px-4 py-2">{response.participationID}</td>
                  <td className="px-4 py-2">{response.questionID}</td>
                  <td className="px-4 py-2">{response.optionID}</td>
                  <td className="px-4 py-2">{response.responseText}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleUpdateButton(response.responseID)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteButton(response.responseID)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No responses available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button
          onClick={handleAddButton}
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Response
        </button>
      </div>
    </div>
  );
};

export default ResponseList;
