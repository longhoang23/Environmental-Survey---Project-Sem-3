import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth";

const ResponseList = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // e.g., http://localhost:5169/api
  const [responses, setResponses] = useState([]);
  const [options, setOptions] = useState([]); 
  const [filteredResponses, setFilteredResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParticipationId, setSearchParticipationId] = useState("");
  const [searchQuestionId, setSearchQuestionId] = useState("");
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

  const userRole = JSON.parse(localStorage.getItem('user')).role;
  const isStudent = userRole == 3

  const handleDeleteButton = async (id) => {
    if (window.confirm(`Are you sure you want to delete response ID: ${id}?`)) {
      try {
        // Lấy thông tin phản hồi trước khi xóa
        const responseToDelete = responses.find(r => r.responseID === id);
        const participationID = responseToDelete.participationID;
        const optionToDelete = options.find(opt => opt.optionID === responseToDelete.optionID);
        const scoreToSubtract = optionToDelete ? optionToDelete.score : 0;

        // Xóa phản hồi
        const deleteResponse = await axios.delete(`${apiUrl}/Response/delete/${id}`, {
          headers: getAuthHeaders(),
        });

        if (deleteResponse.status === 200) {
          // Cập nhật tổng điểm cho participation
          const participationResponse = await axios.get(`${apiUrl}/Participation/${participationID}`, {
            headers: getAuthHeaders(),
          });

          const currentTotalScore = participationResponse.data.totalScore || 0;
          const updatedTotalScore = currentTotalScore - scoreToSubtract;

          // Cập nhật tổng điểm mới
          await axios.put(`${apiUrl}/Participation/update/${participationID}`, {
            totalScore: updatedTotalScore,
          }, {
            headers: getAuthHeaders(),
          });

          // Cập nhật trạng thái phản hồi
          setResponses(responses.filter((r) => r.responseID !== id));
          setFilteredResponses(
            filteredResponses.filter((r) => r.responseID !== id)
          );
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
        setFilteredResponses(response.data); // Initialize filtered list
      } catch (err) {
        console.error("Error fetching responses:", err);
        setError("Failed to load responses.");
      } finally {
        setLoading(false);
      }
    };

    const fetchOptions = async () => { // Thêm hàm lấy options
      try {
        const response = await axios.get(`${apiUrl}/SurveyOption/all`, {
          headers: getAuthHeaders(),
        });
        setOptions(response.data);
      } catch (err) {
        console.error("Error fetching options:", err);
        setError("Failed to load options.");
      }
    };

    fetchResponses();
    fetchOptions(); // Gọi hàm lấy options
  }, [apiUrl]);

  // Filter responses based on ParticipationID and QuestionID
  useEffect(() => {
    let filtered = responses;

    if (searchParticipationId) {
      filtered = filtered.filter((r) =>
        r.participationID.toString().includes(searchParticipationId)
      );
    }

    if (searchQuestionId) {
      filtered = filtered.filter((r) =>
        r.questionID.toString().includes(searchQuestionId)
      );
    }

    setFilteredResponses(filtered);
  }, [searchParticipationId, searchQuestionId, responses]);

  if (loading) return <div>Loading responses...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Response List</h2>

      {/* Search Bars */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Participation ID"
          value={searchParticipationId}
          onChange={(e) => setSearchParticipationId(e.target.value)}
          className="border p-2 rounded w-1/2 mr-2"
        />
        <input
          type="text"
          placeholder="Search by Question ID"
          value={searchQuestionId}
          onChange={(e) => setSearchQuestionId(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Participation ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Question ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Option ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Response Text
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600" hidden={isStudent}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredResponses.length > 0 ? (
              filteredResponses.map((response) => (
                <tr
                  key={response.responseID}
                  className="border-b hover:bg-gray-50"
                >
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
                    <button onClick={() => handleUpdateButton(response.responseID)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      hidden={isStudent}
                      >Update</button>
                    <button onClick={() => handleDeleteButton(response.responseID)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      hidden={isStudent}
                      >Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">No responses available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button onClick={handleAddButton} className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600">Add Response</button>
      </div>
    </div>
  );
};

export default ResponseList;