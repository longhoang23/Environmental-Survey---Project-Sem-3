import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [klasses, setKlasses] = useState([]);
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
  const isStudent = userRole == 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentResponse = await axios.get(`${apiUrl}/Student/all`);
        setStudents(studentResponse.data);

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

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  const getKlassName = (klassId) => {
    const found = klasses.find((k) => k.klassId === klassId);
    return found ? found.name : "No Class";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Student List</h1>
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
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.userID} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {student.userID}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {student.firstName}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {student.lastName}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {student.username}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {getKlassName(student.klassId)}
                  </td>

                  <td className="px-4 py-2 text-sm">
                    <button
                      onClick={() => handleDetailButton(student.userID)}
                      title="Click to see more details"
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
