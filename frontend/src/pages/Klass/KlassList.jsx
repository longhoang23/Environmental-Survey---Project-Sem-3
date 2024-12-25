import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const KlassList = () => {

    const[klasses, setKlasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_PUBLIC_URL;
    const navigate = useNavigate();

    const handleAddButton = () => {
        navigate("/admin/add-class");
    };

    const handleUpdateButton = (id) => {
        navigate(`/admin/update-class/${id}`);
    };

    const handleDeleteButton = async (id) => {
        const confirmDelete = window.confirm(`Do you want to delete id: ${id}`);
        if (!confirmDelete) return;
        try {
          const response = await axios.delete(`${apiUrl}/Klass/delete/${id}`);
          if (response.status === 200) {
            setKlasses(klasses.filter((klass) => klass.klassId !== id));
            alert("Klass deleted successfully!");
          }
        } catch (error) {
          console.error("There was an error deleting the Klass:", error);
          alert("Failed to delete the Klass");
        }
      };

    
      useEffect(() => {
        const fetchKlasses = async () => {
            try {
              debugger
              const response = await axios.get(`${apiUrl}/Klass/all`);
              setKlasses(response.data);
              setLoading(false);
            } catch (err) {
              setError("Failed to load Klasses");
              setLoading(false);
            }
        };
        fetchKlasses();
      }, [apiUrl]);
    
      if (loading) {
        return <div className="loading">Loading...</div>;
      }
    
      if (error) {
        return <div className="error">{error}</div>;
      }
  return (
    <div >
    <h1>Class List</h1>
    <table>
      <thead>
        <tr>
          <th>ClassID</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {klasses.length > 0 ? (
          klasses.map((klass) => (
            <tr key={klass.klassId}>
                <td>{klass.klassId}</td>
                <td>{klass.name}</td>
                <td>
                    <button onClick={() => handleUpdateButton(klass.klassId)}>Update</button>
                    <button onClick={() => handleDeleteButton(klass.klassId)}>Delete</button>
                </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">No Klasses</td>
          </tr>
        )}
      </tbody>
    </table>
    <button onClick={handleAddButton}>
      Add Klass
    </button>
  </div>
  )
}

export default KlassList
