import React, { useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const EventForm = ({ onAddEvent, circleId }) => {
    const { user } = useAuthContext();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState("");
    const [emptyFields, setEmptyFields] = useState([]);

    const allowedChars = /^[a-zA-Z0-9\s.,'-]+$/;

    const handleTitleChange = (e) => {
        const value = e.target.value;
        if (value === '' || allowedChars.test(value)) {
            setTitle(value);
        }
    };

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        if (value === '' || allowedChars.test(value)) {
            setDescription(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError("You must be logged in");
            return;
        }

        const eventDetails = {
            title,
            description,
            date: eventDate,
            approved: false,
            time,
            location,
            circle_id: circleId,
            participants: null,
        };

        console.log(eventDetails)
        


        console.log("hi")
        // Replace '/api/events' with your actual endpoint
        const response = await fetch("/api/events/", {
            method: "POST",
            body: JSON.stringify(eventDetails),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`,
            },
        });

        const json = await response.json();
        console.log(circleId)
        if (!response.ok) {
            setError(json.error || "An error occurred");
            setEmptyFields(json.emptyFields || []);
            setSuccess(""); // Clear any previous success message
        } else {
            console.log("in event form")
            setTitle("");
            setDescription("");
            setEventDate("");
            setTime("");
            setLocation("");
            setError(null);
            setSuccess("Event created successfully!");
            setEmptyFields([]);
            console.log("New event added", json);
        }
    };

    const buttonColor = '#0988d0';
    return (
        <form className="create-event" onSubmit={handleSubmit}>
            <h3>Create a New Event</h3>

            <label>Event Title:</label>
            <input
                type="text"
                onChange={handleTitleChange}
                value={title}
                className={emptyFields.includes("title") ? "error" : ""}
            />

            <label>Description:</label>
            <input
                type="text"
                onChange={handleDescriptionChange}
                value={description}
                className={emptyFields.includes("description") ? "error" : ""}
            />

            <label>Date:</label>
            <input
                type="date"
                onChange={(e) => setEventDate(e.target.value)}
                value={eventDate}
            />

            <label>Time:</label>
            <input
                type="time"
                onChange={(e) => setTime(e.target.value)}
                value={time}
            />

            <label>Location:</label>
            <input
                type="text"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
            />
            <button style={{ backgroundColor: buttonColor }}>Add Event</button>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
        </form>
    );
};

export default EventForm;