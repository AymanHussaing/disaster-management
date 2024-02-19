import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";

const DisasterPage = () => {
    const { id } = useParams()
    const [disaster, setDisaster] = useState(null)

    useEffect(() => {
        const fetchDisaster = async () => {
            try {
                const response = await axios.get(`http://localhost:4010/disasters/${id}`);
                setDisaster(response.data);
            } catch (error) {
                console.error('Error fetching disaster:', error);
            }
        };

        fetchDisaster();
    }, [id]); // Include id in the dependency array to refetch data when id changes
    if (disaster) console.log(disaster)
    return (
        <div>
            {disaster ? (
                <div>
                    {disaster.images.map(url => (
                        <img src={`http://localhost:4010/${url}`} style={{ width: 200, height: 200 }} alt="Disaster Image" />
                    ))}

                    <h2>{disaster.type}</h2>
                    <p>Place: {disaster.place}</p>
                    <p>Status: {disaster.status}</p>
                    {/* Render other disaster details as needed */}
                    <p>Created At: {new Date(disaster.createdAt).toLocaleString()}</p>
                    <button>Physical Help</button>
                    <button>Donate</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default DisasterPage
