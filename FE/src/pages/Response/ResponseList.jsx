import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResponseList = () => {
  const [responses, setResponses] = useState([]);
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Response List</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Response ID</th>
              <th className="px-4 py-2 text-left">Participation ID</th>
              <th className="px-4 py-2 text-left">Question ID</th>
              <th className="px-4 py-2 text-left">Response</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((res) => (
              <tr key={res.responseID} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{res.responseID}</td>
                <td className="px-4 py-2">{res.participationID}</td>
                <td className="px-4 py-2">{res.questionID}</td>
                <td className="px-4 py-2">
                  {res.optionID && res.optionID !== 0 ? (
                    <span>Option ID: {res.optionID}</span>
                  ) : (
                    res.responseText || "N/A"
                  )}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => navigate(`/response/detail/${res.responseID}`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResponseList;
