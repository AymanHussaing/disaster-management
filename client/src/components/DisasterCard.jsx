import React from 'react';
import { Link } from 'react-router-dom';

const DisasterCard = ({ disaster }) => {
  return (
    <div className="card">
      <div className="card-body">
        {/* Use the Link component to navigate to the DisasterPage */}
        <Link to={`/disaster/${disaster._id}`}>
          <h5 className="card-title">{disaster.type}</h5>
        </Link>
        <p className="card-text">Place: {disaster.place}</p>
        <p className="card-text">Status: {disaster.status}</p>
        {/* You can add more information here */}
        <p className="card-text">Created At: {new Date(disaster.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default DisasterCard;
