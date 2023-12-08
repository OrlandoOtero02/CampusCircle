import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext';
import EventForm from "../components/EventForm"; // Import the EventForm component
import MemberDetails from "../components/MemberDetails"; // Import MemberDetails component

const CirclePage = () => {
    const { id } = useParams(); // Get the circle ID from the URL
    const { user } = useAuthContext();
    const [circle, setCircle] = useState(null);



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
                    <div className="circle-members">
                        <h3>Members</h3>
                        <ul>
                            {circle.members.map(member => (
                                <li key={member._id}>
                                    <MemberDetails member={member} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <EventForm circleId={id} />
                </>
            )}
        </div>
    );
};

export default CirclePage;