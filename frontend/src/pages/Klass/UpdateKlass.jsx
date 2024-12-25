import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateKlass = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const { klassId } = useParams(); 
  const [klass, setKlass] = useState(
    { name: "" }
  );
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
      const response = await axios.put(`${apiUrl}/Klass/update/${klassId}`, klass, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (response.status === 200) {
        alert("Klass updated successfully!");
        navigate("/admin/classes"); // Go back to the klass list
      }
    } catch (err) {
      console.error("Error updating Klass:", err);
      setError("Failed to update Klass");
    }
  };

  if (loading) {
    return <div>Loading Klass data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="form-container">
      <h2>Update Klass (ID: {klassId})</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Klass Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={klass.name || ""}
            onChange={(e) => setKlass({ ...klass, [e.target.name]: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Update Klass
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default UpdateKlass;
