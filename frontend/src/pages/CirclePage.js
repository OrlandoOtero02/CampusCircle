import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext';
import EventForm from "../components/EventForm"; // Import the EventForm component
import EventDetails from "../components/EventDetails"; // Import EventDetails component for displaying each event

const CirclePage = () => {
    const { id } = useParams(); // Get the circle ID from the URL
    const { user } = useAuthContext();
    const [circle, setCircle] = useState(null);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchCircleDetails = async () => {
            // Fetch circle details
            const circleResponse = await fetch(`/api/circles/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            if (circleResponse.ok) {
                const jsonCircle = await circleResponse.json();
                setCircle(jsonCircle);
            }

            // Fetch events related to this circle
            const eventsResponse = await fetch(`/api/events/circle/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            if (eventsResponse.ok) {
                const jsonEvents = await eventsResponse.json();
                setEvents(jsonEvents);
            }
        };

        if (user) {
            fetchCircleDetails();
        }
    }, [id, user]);


    return (
        <div className="circle-page">
            {circle && (
                <>
                    <h2>{circle.title}</h2>
                    <p>{circle.description}</p>
                    {/* Additional circle details here if needed */}
                    
                    <EventForm circleId={id} />

                    <div className="events">
                        {events.map(event => (
                            <EventDetails key={event._id} event={event} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CirclePage;