import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const EventDetails = () => {
    const { id } = useParams(); // Get the event ID from the URL
    const { user } = useAuthContext();
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/events/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const json = await response.json();

                if (!response.ok) {
                    throw new Error(json.message || 'Could not fetch event');
                }

                setEvent(json);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchEventDetails();
        }
    }, [id, user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="event-details">
            {event && (
                <>
                    <h2>{event.title}</h2>
                    <p>Description: {event.description}</p>
                    <p>Date: {event.date}</p>
                    <p>Time: {event.time}</p>
                    <p>Location: {event.location}</p>
                    {/* Add more event details here as needed */}
                </>
            )}
        </div>
    );
};

export default EventDetails;