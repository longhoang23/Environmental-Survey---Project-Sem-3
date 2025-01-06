import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CompetitionList = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // e.g., http://localhost:5169/api
  const navigate = useNavigate();

  const [competitions, setCompetitions] = useState([]);
  const [filteredCompetitions, setFilteredCompetitions] = useState([]); // For search filtering
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompetitions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/Competition/all`);
        setCompetitions(response.data);
        setFilteredCompetitions(response.data); // Initialize filtered competitions
        setLoading(false);
      } catch (err) {
        console.error("Error fetching competitions:", err);
        setError("Failed to load competitions.");
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, [apiUrl]);

  const handleAddButton = () => {
    navigate("/add-competition");
  };

  const handleUpdateButton = (id) => {
    navigate(`/update-competition/${id}`);
  };

  const handleViewDetailsButton = (id) => {
    navigate(`/competition-detail/${id}`);
  };

  const handleDeleteButton = async (id) => {
    const confirmDelete = window.confirm(
      `Do you want to delete competition with ID: ${id}?`
    );
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(`${apiUrl}/Competition/delete/${id}`);
      if (response.status === 200) {
        setCompetitions(competitions.filter((c) => c.competitionID !== id));
        setFilteredCompetitions(
          filteredCompetitions.filter((c) => c.competitionID !== id)
        ); // Update filtered list
        alert("Competition deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting competition:", error);
      alert("Failed to delete the competition.");
    }
  };

  // Filter competitions based on search term
  useEffect(() => {
    const filtered = competitions.filter((competition) =>
      competition.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompetitions(filtered);
  }, [searchTerm, competitions]);

  if (loading) {
    return <div>Loading competitions...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const userRole = JSON.parse(localStorage.getItem("user")).role;
  const isStudent = userRole === 3;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Competition List</h1>

      {/* Search Input */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Competition ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Title
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Description
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Prize Details
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCompetitions.length > 0 ? (
              filteredCompetitions.map((competition) => (
                <tr
                  key={competition.competitionID}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {competition.competitionID}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {competition.title}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {competition.description}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {competition.prizeDetails}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <button
                      onClick={() =>
                        handleViewDetailsButton(competition.competitionID)
                      }
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateButton(competition.competitionID)
                      }
                      className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                      hidden={isStudent}
                    >
                      Update
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteButton(competition.competitionID)
                      }
                      className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
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
                  No Competitions Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={handleAddButton}
          className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
          hidden={isStudent}
        >
          Add Competition
        </button>
      </div>
    </div>
  );
};

export default CompetitionList;
