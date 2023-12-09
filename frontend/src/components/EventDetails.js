import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';


const EventDetails = ({ event, onApprove }) => {
  const formattedDate = new Date(event.date).toLocaleDateString();
  const formattedTime = event.time; // You might want to format the time as needed
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const {eventtt, circleId} = useParams()

  const handleApprove = async () => {
    if (!window.confirm("Are you sure you want to approve this event?")) {
      return;
    }
  
    try {
      // Approve the event
      const response = await fetch(`/api/events/approveEvent/${event._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
  
      if (response.ok) {
        const { eventId } = await response.json();
  
        // Add approved event to the circle
        const circleResponse = await fetch(`/api/circles/${circleId}/addEvent/${eventId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify({ eventId }),
        });
  
        if (circleResponse.ok) {
          console.log(`Event ${eventId} approved and added to the circle's approvedEvents array`);
          // Update frontend state if necessary
        } else {
          console.error('Failed to update circle with approved event:', circleResponse.statusText);
        }
      } else {
        console.error('Failed to approve event:', response.statusText);
      }
    } catch (error) {
      console.error('Error handling approval:', error.message);
    }
  };

  const handleReject = async () => {
    try {
      // Send a request to delete the event
      const response = await fetch(`/api/events/${event._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        console.log(`Event ${event._id} rejected and deleted`);
        // Handle the response, update state, or perform other actions as needed
      } else {
        console.error(`Failed to delete event ${event._id}:`, response.statusText);
      }
    } catch (error) {
      console.error('Error deleting event:', error.message);

    }
    
  };

  // Conditionally render the component based on event.approved


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
      <Button onClick={handleApprove} variant="contained" color="primary">
        Approve
      </Button>
      <Button onClick={handleReject} variant="contained" color="secondary">
        Reject
      </Button>
    </div>
  );
};

export default EventDetails;
