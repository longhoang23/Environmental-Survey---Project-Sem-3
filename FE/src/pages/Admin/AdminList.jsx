import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth";

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]); // For search filtering
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const navigate = useNavigate();

  const handleAddButton = () => {
    navigate("/admin/add-admin");
  };

  const handleUpdateButton = (id) => {
    navigate(`/admin/update-admin/${id}`);
  };

  const handleDeleteButton = async (id) => {
    const confirmDelete = window.confirm(`Do you want to delete id: ${id}?`);
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(`${apiUrl}/Admin/delete/${id}`, {
        headers: getAuthHeaders(),
      });
      if (response.status === 200) {
        setAdmins(admins.filter((admin) => admin.userID !== id));
        setFilteredAdmins(filteredAdmins.filter((admin) => admin.userID !== id)); // Update filtered list
        alert("Admin deleted successfully!");
      }
    } catch (error) {
      console.error("There was an error deleting the Admin:", error);
      alert("Failed to delete the Admin");
    } finally {
      setLoading(false);
    }
  };

  const handleDetailButton = (id) => {
    navigate(`/admin/admin-detail/${id}`);
  };

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Admin/all`, {
          headers: getAuthHeaders(),
        });
        setAdmins(response.data);
        setFilteredAdmins(response.data); // Initialize filtered admins
        setLoading(false);
      } catch (error) {
        setError("Failed to load Admins");
        setLoading(false);
      }
    };
    fetchAdmins();
  }, [apiUrl]);

  // Filter admins based on search term
  useEffect(() => {
    const filtered = admins.filter((admin) =>
      admin.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.username.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    setFilteredAdmins(filtered);
  }, [searchTerm, admins]);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Admin List</h1>

      {/* Search Input */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by first name or username"
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
                AdminID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                FirstName
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                LastName
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Username
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.length > 0 ? (
              filteredAdmins.map((admin) => (
                <tr key={admin.userID} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {admin.userID}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {admin.firstName}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {admin.lastName}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {admin.username}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <button
                      onClick={() => handleDetailButton(admin.userID)}
                      className="mr-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                    >
                      View Detail
                    </button>
                    <button
                      onClick={() => handleUpdateButton(admin.userID)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteButton(admin.userID)}
                      className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No Admins Available
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
          Add Admin
        </button>
      </div>
    </div>
  );
};

export default AdminList;
