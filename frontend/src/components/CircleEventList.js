import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import EventDetails from './EventDetails';
import { useParams } from 'react-router-dom';

const CircleEventList = () => {
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);  // Initialize events as an empty array
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const json = await response.json();
          setEvents(json || []);  // Ensure that events is an array
        } else {
          console.error('Failed to fetch events:', response.statusText);
        }
      } catch (error) {
        console.error('Error while fetching events:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchEvents();
    }
  }, [user]);

  return (
    <div>
      <h2>Circle Event List</h2>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <ul>
          {events.map((event) => {
            console.log('id:', id);
            console.log('event.circle_id:', event.circle_id);

            // Conditionally render EventDetails based on id being equal to event.circle_id
            return (id === event.circle_id[0]) && (
              <li key={event._id}>
                <EventDetails event={event} circleId={id} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CircleEventList;
