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
    try {
      // Call the onApprove handler, passing the event ID or any other necessary data
      const response = await fetch(`/api/events/approveEvent/${event._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
  
      if (response.ok) {
        // Extract the event ID from the response or use the event._id if available
        const approvedEventId = await response.json();
  
        // Call the API to add the approved event to the circle's approvedEvents array
        const circleResponse = await fetch(`/api/circles/approveEvent/${circleId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify({ eventId: approvedEventId }),
        });
  
        if (circleResponse.ok) {
          console.log(`Event ${approvedEventId} approved and added to the circle's approvedEvents array`);
          // Handle success as needed
        } else {
          console.error('Failed to update circle with approved event:', circleResponse.statusText);
          // Handle failure as needed
        }
      } else {
        console.error('Failed to approve event:', response.statusText);
        // Handle failure as needed
      }
    } catch (error) {
      console.error('Error handling approval:', error.message);
      // Handle errors as needed
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
