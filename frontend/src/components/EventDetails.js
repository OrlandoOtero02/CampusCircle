import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Button from '@mui/material/Button';

const EventDetails = ({ event, onApprove }) => {
  const formattedDate = new Date(event.date).toLocaleDateString();
  const formattedTime = event.time; // You might want to format the time as needed
  const { user } = useAuthContext();
  const [error, setError] = useState(null);

  const handleApprove = async () => {
    // Call the onApprove handler, passing the event ID or any other necessary data
    const response = await fetch(`/api/events/approveEvent/${event._id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });

  };

  // Conditionally render the component based on event.approved
  if (event.approved) {
    return null; // or return <></> for an empty fragment
  }

  return (
    <div className="event-details">
      <h4>{event.title}</h4>
      <p>Description: {event.description}</p>
      <p>Date: {formattedDate}</p>
      <p>Time: {formattedTime}</p>
      <p>Location: {event.location}</p>
      <p>Approved: {event.approved ? 'Yes' : 'No'}</p>
      <p>Participants: {event.participants.length}</p>
      <p>Circle ID: {event.circle_id}</p>
      <button onClick={handleApprove}>Approve</button>
    </div>
  );
};

export default EventDetails;
