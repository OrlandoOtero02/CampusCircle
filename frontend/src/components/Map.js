import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useAuthContext } from '../hooks/useAuthContext';

const Map = () => {
  const { user } = useAuthContext();

  const [events, setEvents] = useState([]);

  // Function to join an event
  const joinEvent = async (eventId) => {
    try {
      console.log("eventid isssss ", eventId)
      const response = await fetch(`/api/events/add/${eventId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        console.error('Failed to join event:', response.status);
        return;
      }

      // Handle the success case if needed
    } catch (error) {
      console.error('Error joining event:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      //circles
      // Fetch circles associated with the user
      const circlesResponse = await fetch('/api/circles', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!circlesResponse.ok) {
        console.error('Failed to fetch circles:', circlesResponse.status);
        return;
      }

      const circles = await circlesResponse.json();


      // Get the IDs of circles where the user is a member
      const userCircleIds = circles
        .filter((circle) => circle.members.includes(user._id))
        .map((circle) => circle._id);

      console.log("circles that I am a part of", userCircleIds)
    
      //get events
      const eventsResponse = await fetch('/api/events', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!eventsResponse.ok) {
        console.error('Failed to fetch events:', eventsResponse.status);
        return;
      }

      const allEvents = await eventsResponse.json();

      console.log("all events are", allEvents)

      // Filter events based on user's circles
      // const filteredEvents = allEvents.filter((event) =>
      //   userCircleIds.includes(event.circle_id)
      // );
      // Filter events based on user's circles
    const filteredEvents = allEvents.filter((event) =>
    event.circle_id.some((eventId) => userCircleIds.includes(eventId))
    );

      console.log("filetered events is ", filteredEvents)

      setEvents(filteredEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    // Fetch events data on component mount
    fetchEvents();
  }, [user.token, user._id]);

  useEffect(() => {
    // Set your Mapbox access token here
    mapboxgl.accessToken =
      'pk.eyJ1Ijoib3VvdGVybyIsImEiOiJjbHByazhzc2IwMGt4MmtvNmRzbWJqOXVvIn0.RJRdRiC_gkuahLAsrkbDFA';

    // Create a new map instance
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/standard', // 3D style URL
      center: [-86.913780, 40.428640], // starting position [lng, lat]
      zoom: 18, // starting zoom,
      pitch: 45, // starting pitch in degrees
      maxBounds: [[-86.930515, 40.420158], [-86.910465, 40.435776]],
      attributionControl: false, // Disable the default attribution control
    });

    // Add 3D building layer
    map.on('load', () => {
      console.log('Map loaded');
      // Add a 3D building layer
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
          'fill-extrusion-opacity': 0.8,
        },
      });

      // Add markers for each event
      events.forEach((event) => {
        const { location, title, description, _id: eventId } = event;
        const [lng, lat] = location.split(',').map(parseFloat);

        // // Create a marker
        // const marker = new mapboxgl.Marker()
        //   .setLngLat([lng, lat])
        //   .setPopup(new mapboxgl.Popup().setHTML(`<h3>${title}</h3><p>${description}</p>`))
        //   .addTo(map);

        // Create a marker
        const marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.Popup()
          .setHTML(`
            <h3>${title}</h3>
            <p>${description}</p>
            <button id="popupButton">RSVP</button>
          `))
        .addTo(map);

        // Add click event listener to the button inside the popup
        marker._popup.on('open', () => {
          const buttonElement = document.getElementById('popupButton');
          if (buttonElement) {
            buttonElement.addEventListener('click', () => {
              // Handle button click here
              //join/unjoin participants array for event
              joinEvent(eventId); // Call the joinEvent function with the event ID
            });
          }
        });

        // Cleanup the event listener when the popup is closed
        marker._popup.on('close', () => {
          const buttonElement = document.getElementById('popupButton');
          if (buttonElement) {
            buttonElement.removeEventListener('click');
          }
        });


      });
    });

    // Cleanup the map when the component unmounts
    return () => map.remove();
  }, [events]); // The effect now depends on the events state

  return <div id="map" style={{ width: '100%', height: '650px' }} />;
};

export default Map;
