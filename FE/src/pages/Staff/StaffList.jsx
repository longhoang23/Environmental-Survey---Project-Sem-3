import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth"; // Assuming you have this utility

const StaffList = () => {
  const [staffs, setStaffs] = useState([]);
  const [filteredStaffs, setFilteredStaffs] = useState([]); // For displaying filtered staff
  const [sections, setSections] = useState([]); // list of { sectionId, name }
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // e.g., http://localhost:5169/api
  const navigate = useNavigate();

  // Handle Add new staff
  const handleAddButton = () => {
    navigate("/admin/add-staff");
  };

  // Show staff detail
  const handleDetailButton = (id) => {
    navigate(`/staff-detail/${id}`);
  };

  // Update staff
  const handleUpdateButton = (id) => {
    navigate(`/admin/update-staff/${id}`);
  };

  // Delete staff
  const handleDeleteButton = async (id) => {
    const confirmDelete = window.confirm(
      `Do you want to delete staff with id: ${id}?`
    );
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(`${apiUrl}/Staff/delete/${id}`, {
        headers: getAuthHeaders(),
      });
      if (response.status === 200) {
        setStaffs(staffs.filter((s) => s.userID !== id));
        setFilteredStaffs(filteredStaffs.filter((s) => s.userID !== id));
        alert("Staff deleted successfully!");
      }
    } catch (error) {
      console.error("There was an error deleting the Staff:", error);
      alert("Failed to delete the Staff");
    } finally {
      setLoading(false);
    }
  };

  // Fetch staff list on mount
  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const sectionResponse = await axios.get(`${apiUrl}/Section/all`);
        setSections(sectionResponse.data);

        const staffResponse = await axios.get(`${apiUrl}/Staff/all`, {
          headers: getAuthHeaders(),
        });
        setStaffs(staffResponse.data);
        setFilteredStaffs(staffResponse.data); // Initialize filtered staff list
        setLoading(false);
      } catch (err) {
        console.error("Error fetching staffs/sections:", err);
        setError("Failed to load Staffs or Sections");
        setLoading(false);
      }
    };
    fetchStaffs();
  }, [apiUrl]);

  // Update filtered staff list whenever searchTerm or staffs changes
  useEffect(() => {
    const filtered = staffs.filter(
      (staff) =>
        staff.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStaffs(filtered);
  }, [searchTerm, staffs]);

  const getSectionName = (sectionId) => {
    const found = sections.find((s) => s.sectionId === sectionId);
    return found ? found.name : "No Section";
  };

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Staff List</h1>

      {/* Search Bar */}
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
                StaffID
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
                Section
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStaffs.length > 0 ? (
              filteredStaffs.map((staff) => (
                <tr key={staff.userID} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">{staff.userID}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{staff.firstName}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{staff.lastName}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{staff.username}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{getSectionName(staff.sectionId)}</td>
                  <td className="px-4 py-2 text-sm">
                    <button
                      onClick={() => handleDetailButton(staff.userID)}
                      title="Click to see more details"
                      className="mr-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                    >
                      View Detail
                    </button>
                    <button
                      onClick={() => handleUpdateButton(staff.userID)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteButton(staff.userID)}
                      className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No Staff Available
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
          Add Staff
        </button>
      </div>
    </div>
  );
};

export default StaffList;
