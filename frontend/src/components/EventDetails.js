// import React, { useState } from 'react';
// import { useAuthContext } from '../hooks/useAuthContext';
// import formatDistanceToNow from 'date-fns/formatDistanceToNow';
// import Button from '@mui/material/Button';

// const EventDetails = ({ event }) => {
//   const { user } = useAuthContext();
//   const [error, setError] = useState(null);

//   const handleJoinEvent = async () => {
//     if (!user) {
//       setError('You must be logged in');
//       return;
//     }

//     // Add logic for joining the event here
//     console.log('Join Event button clicked');
//   };

//   const handleLeaveEvent = async () => {
//     if (!user) {
//       setError('You must be logged in');
//       return;
//     }

//     // Add logic for leaving the event here
//     console.log('Leave Event button clicked');
//   };

//   const textColor = document.body.className === 'dark' ? 'white' : 'black';

//   return (
//     <div className="event-details">
//       <h4 style={{ color: textColor }}>{event.title}</h4>
//       <p>Description: {event.description}</p>
//       <p>Location: {event.location}</p>
//       <p>Starts at: {formatDistanceToNow(new Date(event.startDate), { addSuffix: true })}</p>
//       <Button onClick={handleJoinEvent}>Join Event</Button>
//       <Button onClick={handleLeaveEvent} style={{ marginLeft: '10px' }}>Leave Event</Button>
//     </div>
//   );
// };

// export default EventDetails;

// EventDetails.js

import React from 'react';

const EventDetails = ({ event }) => {
  const formattedDate = new Date(event.date).toLocaleDateString();
  const formattedTime = event.time; // You might want to format the time as needed

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
    </div>
  );
};

export default EventDetails;

