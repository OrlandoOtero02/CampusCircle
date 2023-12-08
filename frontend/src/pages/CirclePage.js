import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext';
import EventForm from "../components/EventForm"; // Import the EventForm component
import MemberDetails from "../components/MemberDetails"; // Import MemberDetails component
import Button from '@mui/material/Button';
import EventDetails from "../components/EventDetails"; // Import EventDetails component for displaying each event
import Messaging from "./Messaging";
import EventList from "../components/EventList"; // Import the EventList component
import CircleEventList from "../components/CircleEventList";

const CirclePage = () => {
    const { id } = useParams(); // Get the circle ID from the URL
    const { user } = useAuthContext();
    const [circle, setCircle] = useState(null);

    const isOwner = circle && user && circle.user_id === user._id;

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

    const handleTransferLeadership = async (memberId) => {
        // Confirm the action
        if (!window.confirm("Are you sure you want to transfer leadership to this member?")) {
            return;
        }

        console.log("member id: " + memberId)
        console.log("user._id: " + user._id)
        console.log("circle id: " + circle._id)
        try {
            const response = await fetch(`/api/circles/u/${circle._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ user_id: memberId }) // Update the user_id to the new leader's ID
            });

            const json = await response.json();

            if (response.ok) {
                console.log("Leadership transferred successfully:", json);
                setCircle({ ...circle, user_id: memberId }); // Update local state to reflect the change
            } else {
                console.error("Failed to transfer leadership:", json.error);
            }
        } catch (error) {
            console.error("Error transferring leadership:", error);
        }
    };

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
                                    {/* Exclude the current user from seeing the transfer button next to their own name */}
                                    {isOwner && member._id !== user._id && (
                                        <Button 
                                            variant="contained" 
                                            onClick={() => handleTransferLeadership(member._id)}
                                        >
                                            Transfer Leadership
                                        </Button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <EventForm circleId={id} />
                    <Messaging circleId={id}/>
                    {/* Conditionally render EventList only if the user is the owner */}
                    {isOwner && <CircleEventList circleId={id} />}
                </>
            )}
        </div>
    );
};

export default CirclePage;
