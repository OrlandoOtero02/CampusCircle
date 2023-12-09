import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useAuthContext } from "../hooks/useAuthContext";

//maybe comment out
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from '@mui/material/Button';


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
  const [clickedLocation, setClickedLocation] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoib3VvdGVybyIsImEiOiJjbHByazhzc2IwMGt4MmtvNmRzbWJqOXVvIn0.RJRdRiC_gkuahLAsrkbDFA';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/standard',
      center: [-86.913780, 40.428640],
      zoom: 15,
      pitch: 0,
      maxBounds: [[-86.930515, 40.420158], [-86.910465, 40.435776]],
      attributionControl: false // Disable the default attribution control
    });

    map.on('load', () => {
      map.addLayer({
        id: '3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        minzoom: 15,
        paint: {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-base': ['get', 'min_height'],
          'fill-extrusion-opacity': 0.8
        }
      });
    });

    // Event listener for map click
    map.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      setClickedLocation({ lng, lat });

      // Update the input box with coordinates
      setLocation(`${lng.toFixed(6)}, ${lat.toFixed(6)}`);
    });

    // Cleanup the map when the component unmounts
    return () => map.remove();
  }, []);

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

      <div id="map" style={{ width: '50%', height: '350px' }} />
      <button style={{ backgroundColor: buttonColor }}>Add Event</button>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </form>
  );
};

export default EventForm;
