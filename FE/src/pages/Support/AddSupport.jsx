import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth";


const AddSupport = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const navigate = useNavigate();

  const [support, setSupport] = useState({
    contactInfo: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${apiUrl}/Support/create`, support, {
        headers: getAuthHeaders(),
      });
      
      if (response.status === 200 || response.status === 201) {
        alert("Support created successfully!");
        navigate("/admin/support-list");
      }
    } catch (err) {
      console.error("Error creating support:", err);
      setError("Failed to create support. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Add Support</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-md rounded">
        
        {/* Contact Info */}
        <div className="flex flex-col mb-4">
          <label htmlFor="contactInfo" className="font-semibold mb-1">
            Contact Info
          </label>
          <input
            id="contactInfo"
            type="text"
            value={support.contactInfo}
            onChange={(e) => setSupport({ ...support, contactInfo: e.target.value })}
            className="border p-2 rounded"
            placeholder="Enter contact info"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {loading ? "Submitting..." : "Add Support"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default AddSupport;
