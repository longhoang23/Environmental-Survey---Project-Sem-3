import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../Services/userAuth";

const UpdateCompetition = () => {
    const apiUrl = import.meta.env.VITE_PUBLIC_URL; // Base API URL
    const { id } = useParams(); // Get competition ID from route
    const navigate = useNavigate();

    const [competition, setCompetition] = useState({
        title: "",
        description: "",
        prizeDetails: "",
        winner1: "",
        winner2: "",
        winner3: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch existing competition data
    useEffect(() => {
        const fetchCompetition = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/Competition/${id}`, {
            headers: getAuthHeaders(),
            });
            if (response.status === 200) {
            setCompetition(response.data);
            } else {
            setError("Failed to load competition details.");
            }
        } catch (err) {
            console.error("Error fetching competition:", err);
            setError("Failed to load competition details.");
        } finally {
            setLoading(false);
        }
        };

        fetchCompetition();
    }, [apiUrl, id]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
        const response = await axios.put(`${apiUrl}/Competition/update/${id}`, competition,{
                headers: getAuthHeaders() 
            });

        if (response.status === 200) {
            alert("Competition updated successfully!");
            navigate("/competition-list");
        }
        } catch (err) {
        console.error("Error updating competition:", err);
        setError("Failed to update competition. Please try again.");
        } finally {
        setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading competition details...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Update Competition</h1>
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-white p-6 shadow-md rounded"
        >
            {/* Title */}
            <div className="flex flex-col mb-4">
            <label htmlFor="title" className="font-semibold mb-2">
                Title
            </label>
            <input
                id="title"
                type="text"
                value={competition.title}
                onChange={(e) => setCompetition({ ...competition, title: e.target.value })}
                required
                className="border p-2 rounded"
            />
            </div>

            {/* Description */}
            <div className="flex flex-col mb-4">
            <label htmlFor="description" className="font-semibold mb-2">
                Description
            </label>
            <textarea
                id="description"
                value={competition.description}
                onChange={(e) =>
                setCompetition({ ...competition, description: e.target.value })
                }
                className="border p-2 rounded"
                rows="4"
            ></textarea>
            </div>

            {/* Prize Details */}
            <div className="flex flex-col mb-4">
            <label htmlFor="prizeDetails" className="font-semibold mb-2">
                Prize Details
            </label>
            <input
                id="prizeDetails"
                type="text"
                value={competition.prizeDetails}
                onChange={(e) =>
                setCompetition({ ...competition, prizeDetails: e.target.value })
                }
                className="border p-2 rounded"
            />
            </div>

            {/* Winner1 */}
            <div className="flex flex-col mb-4">
            <label htmlFor="winner1" className="font-semibold mb-2">
                Winner 1 (User ID)
            </label>
            <input
                id="winner1"
                type="text"
                value={competition.winner1}
                onChange={(e) =>
                setCompetition({ ...competition, winner1: e.target.value })
                }
                className="border p-2 rounded"
            />
            </div>

            {/* Winner2 */}
            <div className="flex flex-col mb-4">
            <label htmlFor="winner2" className="font-semibold mb-2">
                Winner 2 (User ID)
            </label>
            <input
                id="winner2"
                type="text"
                value={competition.winner2}
                onChange={(e) =>
                setCompetition({ ...competition, winner2: e.target.value })
                }
                className="border p-2 rounded"
            />
            </div>

            {/* Winner3 */}
            <div className="flex flex-col mb-4">
            <label htmlFor="winner3" className="font-semibold mb-2">
                Winner 3 (User ID)
            </label>
            <input
                id="winner3"
                type="text"
                value={competition.winner3}
                onChange={(e) =>
                setCompetition({ ...competition, winner3: e.target.value })
                }
                className="border p-2 rounded"
            />
            </div>

            <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
            disabled={loading}
            >
            {loading ? "Updating..." : "Update Competition"}
            </button>

            {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
        </div>
    );
};

export default UpdateCompetition;
