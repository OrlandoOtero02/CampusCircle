// components/MapPopup.js
import React from 'react';

const MapPopup = ({ title, description }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default MapPopup;
