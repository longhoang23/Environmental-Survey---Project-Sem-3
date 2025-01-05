import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SectionList = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const navigate = useNavigate();

  // Handle "Add Section" button
  const handleAddButton = () => {
    navigate("/admin/add-section"); 
  };

  // Handle "Update" button for a specific section
  const handleUpdateButton = (id) => {
    navigate(`/admin/update-section/${id}`);
  };

  // Handle "Delete" button for a specific section
  const handleDeleteButton = async (id) => {
    const confirmDelete = window.confirm(`Do you want to delete section with id: ${id}?`);
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(`${apiUrl}/Section/delete/${id}`);
      if (response.status === 200) {
        setSections(sections.filter((section) => section.sectionId !== id));
        alert("Section deleted successfully!");
      }
    } catch (error) {
      console.error("There was an error deleting the Section:", error);
      alert("Failed to delete the Section");
    }
  };

  // Fetch sections from API on component mount
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Section/all`);
        setSections(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load Sections");
        setLoading(false);
      }
    };
    fetchSections();
  }, [apiUrl]);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Section List</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Section ID
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
            {sections.length > 0 ? (
              sections.map((section) => (
                <tr key={section.sectionId} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {section.sectionId}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {section.name}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <button
                      onClick={() => handleUpdateButton(section.sectionId)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteButton(section.sectionId)}
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
                  No Sections Available
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
          Add Section
        </button>
      </div>
    </div>
  );
};

export default SectionList;
