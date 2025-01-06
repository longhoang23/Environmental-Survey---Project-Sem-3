import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ParticipationList = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // e.g., http://localhost:5169/api
  const [participations, setParticipations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddButton = () => {
    navigate("/add-participation");
  };

  const handleDetailButton = (id) => {
    navigate(`/participation-detail/${id}`);
  };

  const handleUpdateButton = (id) => {
    navigate(`/update-participation/${id}`);
  };

  const userRole = JSON.parse(localStorage.getItem('user')).role;
  const isStudent = userRole == 3

  const handleDeleteButton = async (id) => {
    if (
      window.confirm(`Are you sure you want to delete participation ID: ${id}?`)
    ) {
      try {
        const response = await axios.delete(`${apiUrl}/Participation/delete/${id}`);
        if (response.status === 200) {
          setParticipations(
            participations.filter((p) => p.participationID !== id)
          );
          alert("Participation deleted successfully!");
        }
      } catch (err) {
        console.error("Error deleting participation:", err);
        alert("Failed to delete participation.");
      }
    }
  };

  useEffect(() => {
    const fetchParticipations = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Participation/all`);
        setParticipations(response.data);
      } catch (err) {
        console.error("Error fetching participations:", err);
        setError("Failed to load participations.");
      } finally {
        setLoading(false);
      }
    };
    fetchParticipations();
  }, [apiUrl]);

  if (loading) return <div>Loading participations...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Participation List</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                User ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Survey ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Participation Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Total Score
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                FeedBack
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600" hidden={isStudent}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {participations.length > 0 ? (
              participations.map((participation) => (
                <tr
                  key={participation.participationID}
                  className="border-b hover:bg-gray-50"
                >
                  <td
                    className="px-4 py-2 text-blue-600 cursor-pointer"
                    onClick={() =>
                      handleDetailButton(participation.participationID)
                    }
                  >
                    {participation.participationID}
                  </td>
                  <td className="px-4 py-2">{participation.userID}</td>
                  <td className="px-4 py-2">{participation.surveyID}</td>
                  <td className="px-4 py-2">{participation.participationDate ? participation.participationDate.slice(0, 10) : ""}</td>
                  <td className="px-4 py-2">{participation.totalScore}</td>
                  <td className="px-4 py-2">{participation.feedback}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() =>
                        handleUpdateButton(participation.participationID)
                      }
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      hidden={isStudent}
                    >
                      Update
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteButton(participation.participationID)
                      }
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      hidden={isStudent}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No participations available.
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
          Add Participation
        </button>
      </div>
    </div>
  );
};

export default ParticipationList;
