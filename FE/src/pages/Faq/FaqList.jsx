import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth"; // Assuming you have this utility

const FaqList = () => {
  const [faqs, setFaq] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const navigate = useNavigate();

  const handleAddButton = () => {
    navigate("/admin/add-faq");
  };

  const handleUpdateButton = (id) => {
    navigate(`/admin/update-faq/${id}`);
  };

  const handleDeleteButton = async (id) => {
    const confirmDelete = window.confirm(`Do you want to delete id: ${id}`);
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(`${apiUrl}/Faq/delete/${id}`,{
        headers: getAuthHeaders(),
      });
      if (response.status === 200) {
        setFaq(faqs.filter((surveyQ) => surveyQ.questionID !== id));
        alert("Faq deleted successfully!");
      }
    } catch (error) {
      console.error("There was an error deleting the Faq:", error);
      alert("Failed to delete Faq");
    }
  };

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Faq/all`);
        setFaq(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load Faqs");
        setLoading(false);
      }
    };
    fetchFaq();
  }, [apiUrl]);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Faq List</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Faq ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                QUestion
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Answer
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {faqs.length > 0 ? (
              faqs.map((faq) => (
                <tr key={faq.faqid} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {faq.faqid}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {faq.question}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {faq.answer}
                  </td>

                  <td className="px-4 py-2 text-sm">
                    <button
                      onClick={() => handleUpdateButton(faq.faqid)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteButton(faq.faqid)}
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
                  No Faq Available
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
          Add New Faq
        </button>
      </div>
    </div>
  );
};

export default FaqList;
