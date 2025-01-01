import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserRequests = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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

  const handleApprove = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${apiUrl}/User/admin/approve/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert(`User with ID: ${userId} has been approved.`);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.userId !== userId)
        );
      }
    } catch (error) {
      console.error("Error approving user:", error);
      alert("Failed to approve user.");
    }
  };

  const handleDecline = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${apiUrl}/User/admin/decline/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert(`User with ID: ${userId} has been declined.`);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.userId !== userId)
        );
      }
    } catch (error) {
      console.error("Error declining user:", error);
      alert("Failed to decline user.");
    }
  };

  const handleViewDetail = (userId) => {
    const selectedUser = users.find((user) => user.userId === userId);
    if (selectedUser) {
      navigate(`/admin/user-detail/${userId}`, {
        state: { user: selectedUser },
      });
    } else {
      alert("User not found!");
    }
  };

  const formatValue = (value) =>
    value === null || value === undefined ? "null" : value;

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center p-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-6xl p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">User Requests</h1>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-blue-100 text-gray-700 uppercase text-sm leading-normal font-semibold">
                  <th className="py-3 px-6 text-left">
                    Registration Request ID
                  </th>
                  <th className="py-3 px-6 text-left">User ID</th>
                  <th className="py-3 px-6 text-left">First Name</th>
                  <th className="py-3 px-6 text-left">Last Name</th>
                  <th className="py-3 px-6 text-left">Roll/Emp No</th>
                  <th className="py-3 px-6 text-left">Class ID</th>
                  <th className="py-3 px-6 text-left">Section ID</th>
                  <th className="py-3 px-6 text-left">Specification</th>
                  <th className="py-3 px-6 text-left">Admission Date</th>
                  <th className="py-3 px-6 text-left">Join Date</th>
                  <th className="py-3 px-6 text-left">Requested At</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-medium">
                {currentItems.map((user) => (
                  <tr
                    key={user.registrationRequestId}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3 px-6 text-left">
                      {formatValue(user.registrationRequestId)}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {formatValue(user.userId)}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {formatValue(user.firstName)}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {formatValue(user.lastName)}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {formatValue(user.rollOrEmpNo)}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {formatValue(user.classId)}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {formatValue(user.sectionId)}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {formatValue(user.specification)}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {formatValue(user.admissionDate)}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {formatValue(user.joinDate)}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {formatValue(user.requestedAt)}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleApprove(user.userId)}
                          className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleDecline(user.userId)}
                          className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => handleViewDetail(user.userId)}
                          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
                        >
                          View Detail
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex justify-center mt-4 items-center">
          <nav className="flex items-center space-x-2">
            {currentPage > 1 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="text-gray-700 hover:underline"
              >
                Previous
              </button>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
            {currentPage < totalPages && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="text-gray-700 hover:underline"
              >
                Next
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default UserRequests;
