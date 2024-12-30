import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserRequests = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/User/admin/pending-requests`
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleViewDetail = (userId) => {
    navigate(`/user-detail/${userId}`);
  };

  const handleApprove = (userId) => {
    console.log(`Approved user with ID: ${userId}`);
  };

  const handleReject = (userId) => {
    console.log(`Rejected user with ID: ${userId}`);
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const pageNumbers = [];
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center p-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-6xl p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">User Requests</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-blue-100 text-gray-700 uppercase text-sm leading-normal font-semibold">
                <th className="py-3 px-6 text-left">User ID</th>
                <th className="py-3 px-6 text-left">First Name</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Register Date</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-medium">
              {currentItems.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-6 text-left">{user.userId}</td>
                  <td className="py-3 px-6 text-left">{user.firstName}</td>
                  <td className="py-3 px-6 text-left">
                    {user.user.role === 2
                      ? "Staff"
                      : user.user.role === 3
                      ? "Student"
                      : "Unknown"}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {new Date(user.requestedAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-6 text-center flex justify-center space-x-2">
                    <button
                      onClick={() => handleApprove(user.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(user.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleViewDetail(user.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
                    >
                      View Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4 items-center">
          <nav className="flex items-center space-x-2">
            {currentPage > 1 && (
              <button
                onClick={() => paginate(currentPage - 1)}
                className="flex items-center text-gray-700 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
                Previous
              </button>
            )}
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-4 py-2 rounded ${
                  currentPage === number
                    ? "font-bold text-blue-500"
                    : "text-gray-700"
                }`}
              >
                {number}
              </button>
            ))}
            {currentPage < totalPages && (
              <button
                onClick={() => paginate(currentPage + 1)}
                className="flex items-center text-gray-700 hover:underline"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 ml-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default UserRequests;
