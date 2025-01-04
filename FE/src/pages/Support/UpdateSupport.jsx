import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateSupport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;

  const [support, setSupport] = useState({
    contactInfo: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSupport = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Support/${id}`);
        setSupport(response.data);
      } catch (err) {
        setError("Failed to load support.");
      } finally {
        setLoading(false);
      }
    };
    fetchSupport();
  }, [id, apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.put(`${apiUrl}/Support/update/${id}`, support);
      if (response.status === 200) {
        alert("Support updated successfully!");
        navigate("/support-list");
      }
    } catch (err) {
      console.error("Error updating support:", err);
      setError("Failed to update support.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Update Support</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-md rounded">
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
          Update Support
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateSupport;
