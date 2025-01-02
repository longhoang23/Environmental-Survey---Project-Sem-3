import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SeminarList = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // e.g. http://localhost:5169/api
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddButton = () => {
    navigate("/add-seminar");
  };

  const handleDetailButton = (id) => {
    navigate(`/seminar-detail/${id}`);
  };

  const handleUpdateButton = (id) => {
    navigate(`/update-seminar/${id}`);
  };

  const handleDeleteButton = async (id) => {
    const confirmDelete = window.confirm(`Do you want to delete seminar with id: ${id}?`);
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(`${apiUrl}/Seminar/delete/${id}`);
      if (response.status === 200) {
        setSeminars(seminars.filter((s) => s.seminarID !== id));
        alert("Seminar deleted successfully!");
      }
    } catch (error) {
      console.error("There was an error deleting the Seminar:", error);
      alert("Failed to delete the Seminar");
    } finally {
      setLoading(false);
    }
  };

  // Load seminars on mount
  useEffect(() => {
    const fetchSeminars = async () => {
      setLoading(true);
      try {
        const seminarResponse = await axios.get(`${apiUrl}/Seminar/all`);
        setSeminars(seminarResponse.data);
      } catch (err) {
        console.error("Error fetching seminars:", err);
        setError("Failed to load seminars.");
      } finally {
        setLoading(false);
      }
    };
    fetchSeminars();
  }, [apiUrl]);

  if (loading) {
    return <div>Loading seminars...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Seminar List</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">SeminarID</th>
              {/* <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Conducted By</th> */}
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Location</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Date</th>
              {/* <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Description</th> */}
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {seminars.length > 0 ? (
              seminars.map((seminar) => (
                <tr key={seminar.seminarID} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">{seminar.seminarID}</td>
                  {/* <td className="px-4 py-2 text-sm text-gray-700">{seminar.conductedBy}</td> */}
                  <td className="px-4 py-2 text-sm text-gray-700">{seminar.location}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{seminar.date ? seminar.date.slice(0, 10) : ""}</td>
                  {/* <td className="px-4 py-2 text-sm text-gray-700">{seminar.description}</td> */}
                  <td className="px-4 py-2 text-sm">
                  <button
                      onClick={() => handleDetailButton(seminar.seminarID)}
                      className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleUpdateButton(seminar.seminarID)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteButton(seminar.seminarID)}
                      className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                    >
                      Delete
                    </button>
                    
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">No Seminars Available</td>
              </tr>
            )}
          </tbody>
        </table>
        <button
          onClick={handleAddButton}
          className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none mt-4"
        >
          Add Seminar
        </button>
      </div>
    </div>
  );
};

export default SeminarList;
