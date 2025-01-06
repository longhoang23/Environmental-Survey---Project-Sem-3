import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]); // For filtering based on search
  const [klasses, setKlasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;

  const navigate = useNavigate();

  const handleAddButton = () => {
    navigate("/admin/add-student");
  };

  const handleDetailButton = (id) => {
    navigate(`/student-detail/${id}`);
  };

  const handleUpdateButton = (id) => {
    navigate(`/admin/update-student/${id}`);
  };

  const handleDeleteButton = async (id) => {
    const confirmDelete = window.confirm(
      `Do you want to delete student with id: ${id}?`
    );
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(`${apiUrl}/Student/delete/${id}`, {
        headers: getAuthHeaders(),
      });
      if (response.status === 200) {
        setStudents(students.filter((s) => s.userID !== id));
        setFilteredStudents(filteredStudents.filter((s) => s.userID !== id));
        alert("Student deleted successfully!");
      }
    } catch (error) {
      console.error("There was an error deleting the Student:", error);
      alert("Failed to delete the Student");
    } finally {
      setLoading(false);
    }
  };

  const userRole = JSON.parse(localStorage.getItem("user")).role;
  const isStudent = userRole === 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentResponse = await axios.get(`${apiUrl}/Student/all`);
        setStudents(studentResponse.data);
        setFilteredStudents(studentResponse.data); // Initialize filtered list

        const klassResponse = await axios.get(`${apiUrl}/Klass/all`);
        setKlasses(klassResponse.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching students/classes:", err);
        setError("Failed to load Students or Classes");
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl]);

  // Update filteredStudents whenever searchTerm or students change
  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  const getKlassName = (klassId) => {
    const found = klasses.find((k) => k.klassId === klassId);
    return found ? found.name : "No Class";
  };

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Student List</h1>

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
                StudentID
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
                Class
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.userID} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">{student.userID}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{student.firstName}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{student.lastName}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{student.username}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{getKlassName(student.klassId)}</td>
                  <td className="px-4 py-2 text-sm">
                    <button
                      onClick={() => handleDetailButton(student.userID)}
                      className="mr-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                    >
                      View Detail
                    </button>
                    <button
                      onClick={() => handleUpdateButton(student.userID)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                      hidden={isStudent}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteButton(student.userID)}
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
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No Students Available
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
          Add Student
        </button>
      </div>
    </div>
  );
};

export default StudentList;
