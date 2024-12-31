import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SupportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;

  const [support, setSupport] = useState(null);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Support Details</h2>
      <div className="bg-white shadow-md rounded p-4">
        <p>
          <strong>ID:</strong> {support.supportID}
        </p>
        <p>
          <strong>Contact Info:</strong> {support.contactInfo}
        </p>
        <button
          onClick={() => navigate("/support/list")}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default SupportDetail;
