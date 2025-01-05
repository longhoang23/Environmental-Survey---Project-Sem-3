import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth";

const SupportList = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // e.g., http://localhost:5169/api
  const [supports, setSupports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddButton = () => {
    navigate("/admin/add-support");
  };

  const handleDetailButton = (id) => {
    navigate(`/admin/support-detail/${id}`);
  };

  const handleUpdateButton = (id) => {
    navigate(`/admin/update-support/${id}`);
  };

  const handleDeleteButton = async (id) => {
    if (window.confirm(`Are you sure you want to delete support ID: ${id}?`)) {
      try {
        const response = await axios.delete(`${apiUrl}/Support/delete/${id}`, {
          headers: getAuthHeaders(),
        });
        if (response.status === 200) {
          setSupports(supports.filter((p) => p.supportID !== id));
          alert("Support deleted successfully!");
        }
      } catch (err) {
        console.error("Error deleting support:", err);
        alert("Failed to delete support.");
      }
    }
  };
  const userRole = JSON.parse(localStorage.getItem("user")).role;
  const isStudent = userRole == 3;

  useEffect(() => {
    const fetchSupports = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Support/all`);
        setSupports(response.data);
      } catch (err) {
        console.error("Error fetching supports:", err);
        setError("Failed to load supports.");
      } finally {
        setLoading(false);
      }
    };
    fetchSupports();
  }, [apiUrl]);

  if (loading) return <div>Loading supports...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Support List</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Contact Info
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {supports.length > 0 ? (
              supports.map((support) => (
                <tr
                  key={support.supportID}
                  className="border-b hover:bg-gray-50"
                >
                  <td
                    className="px-4 py-2 text-blue-600 cursor-pointer"
                    onClick={() => handleDetailButton(support.supportID)}
                  >
                    {support.supportID}
                  </td>
                  <td className="px-4 py-2">{support.contactInfo}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleUpdateButton(support.supportID)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteButton(support.supportID)}
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
                  No supports available.
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
          hidden={isStudent}
        >
          Add Support
        </button>
      </div>
    </div>
  );
};

export default SupportList;
