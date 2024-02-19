import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisasterCard from '../components/DisasterCard';

const DisasterList = () => {
  const [disasters, setDisasters] = useState([]);

  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const response = await axios.get('http://localhost:4010/disasters');
        setDisasters(response.data);
      } catch (error) {
        console.error('Error fetching disasters:', error);
      }
    };

    fetchDisasters();
    return () => {
      // Cleanup function
    };
  }, []);

  // Render the list of disasters
  return (
    <div>
      <h1>List of Disasters</h1>
      <div className="card-container">
        {disasters.map(disaster => (
          <DisasterCard key={disaster._id} disaster={disaster} />
        ))}
      </div>
    </div>
  );
};

export default DisasterList;
