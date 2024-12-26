import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddKlass = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const [klass, setKlass] = useState({
    name: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        debugger
      const response = await axios.post(`${apiUrl}/Klass/create`, klass, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check success response (could be 201 Created or 200 OK)
      if (response.status === 201 || response.status === 200) {
        debugger
        alert("Klass added successfully!");
        // Navigate back to Klass list page
        navigate("/admin/classes");
      }
    } catch (error) {
      console.error("Error:", error);
      debugger
      alert("Error adding Klass");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Klass</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Klass Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={klass.name}
            onChange={(e) => setKlass({ ...klass, name: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Add Klass
        </button>
      </form>
    </div>
  );
};

export default AddKlass;
