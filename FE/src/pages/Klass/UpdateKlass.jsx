import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateKlass = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const { klassId } = useParams();

  const [klass, setKlass] = useState({ name: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchKlass = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Klass/${klassId}`);
        if (response.status === 200) {
          setKlass(response.data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching Klass:", err);
        setError("Failed to fetch Klass data");
        setLoading(false);
      }
    };

    fetchKlass();
  }, [apiUrl, klassId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${apiUrl}/Klass/update/${klassId}`,
        klass,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Class updated successfully!");
        navigate("/admin/classes");
      }
    } catch (err) {
      console.error("Error updating Klass:", err);
      setError("Failed to update Klass");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl font-semibold">Loading Klass data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 px-6 py-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-5 text-center">
        Update Class (ID: {klassId})
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Class Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={klass.name || ""}
            onChange={(e) =>
              setKlass({ ...klass, [e.target.name]: e.target.value })
            }
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Update Klass
        </button>

        {error && <p className="mt-3 text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateKlass;
