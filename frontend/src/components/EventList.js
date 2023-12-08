// EventList.js

import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import EventDetails from './EventDetails';

const EventList = () => {
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);  // Initialize events as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        res1 = await response.json()
        console.log(res1)
        if (response.ok) {
          const json = await response.json();
          setEvents(json.events || []);  // Ensure that events is an array
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
      <h2>Event List</h2>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <EventDetails event={event} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
