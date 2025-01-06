import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const KlassList = () => {
  const [klasses, setKlasses] = useState([]);
  const [filteredKlasses, setFilteredKlasses] = useState([]); // For search filtering
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const navigate = useNavigate();

  const handleAddButton = () => {
    navigate("/admin/add-class");
  };

  const handleUpdateButton = (id) => {
    navigate(`/admin/update-class/${id}`);
  };

  const handleDeleteButton = async (id) => {
    const confirmDelete = window.confirm(`Do you want to delete id: ${id}`);
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(`${apiUrl}/Klass/delete/${id}`);
      if (response.status === 200) {
        setKlasses(klasses.filter((klass) => klass.klassId !== id));
        setFilteredKlasses(
          filteredKlasses.filter((klass) => klass.klassId !== id)
        ); // Update filtered list
        alert("Klass deleted successfully!");
      }
    } catch (error) {
      console.error("There was an error deleting the Klass:", error);
      alert("Failed to delete the Klass");
    }
  };

  useEffect(() => {
    const fetchKlasses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Klass/all`);
        setKlasses(response.data);
        setFilteredKlasses(response.data); // Initialize filtered classes
        setLoading(false);
      } catch (err) {
        setError("Failed to load Klasses");
        setLoading(false);
      }
    };
    fetchKlasses();
  }, [apiUrl]);

  // Filter classes based on the search term
  useEffect(() => {
    const filtered = klasses.filter((klass) =>
      klass.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredKlasses(filtered);
  }, [searchTerm, klasses]);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Class List</h1>

      {/* Search Input */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by name"
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
                ClassID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredKlasses.length > 0 ? (
              filteredKlasses.map((klass) => (
                <tr key={klass.klassId} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {klass.klassId}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {klass.name}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <button
                      onClick={() => handleUpdateButton(klass.klassId)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteButton(klass.klassId)}
                      className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No Klasses Available
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
        >
          Add Klass
        </button>
      </div>
    </div>
  );
};

export default KlassList;
