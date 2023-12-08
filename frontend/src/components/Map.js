// // components/Map.js
// import React, { useEffect, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
// import { useAuthContext } from "../hooks/useAuthContext"

// const Map = () => {
//   const { user } = useAuthContext()

//   const hardcodedEvents = [
//     {
//       title: 'Event 1',
//       description: 'This is the first event',
//       location: '-86.913780, 40.428340'
//     },
//     {
//       title: 'Event 2',
//       description: 'Another event at a different location',
//       location: '-86.913690, 40.428650'
//     },
//     {
//       title: 'Event 3',
//       description: 'Event with a unique description',
//       location: '-86.913800, 40.428660'
//     },
//   ];

//   const [events, setEvents] = useState(hardcodedEvents);


//   useEffect(() => {
//     //Fetch events data (replace with your actual API call)
//     const fetchEvents = async () => {
//       // Fetch events associated with the user and set them in the state
//       const response = await fetch('/api/events', {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${user.token}`
//         }
//       }); // Replace with your API endpoint
//       console.log("responce is ", response)
//       const json = await response.json();
//       console.log("json is ",json)
//       setEvents(json);
//     };

//     fetchEvents();
    
//     // Set your Mapbox access token here
//     mapboxgl.accessToken = 'pk.eyJ1Ijoib3VvdGVybyIsImEiOiJjbHByazhzc2IwMGt4MmtvNmRzbWJqOXVvIn0.RJRdRiC_gkuahLAsrkbDFA';

//     // Create a new map instance
//     const map = new mapboxgl.Map({
//       container: 'map', // container ID
//       style: 'mapbox://styles/mapbox/standard', // 3D style URL
//       center: [-86.913780, 40.428640], // starting position [lng, lat]
//       zoom: 18, // starting zoom,
//       pitch: 45, // starting pitch in degrees
//       maxBounds: [[-86.930515, 40.420158], [-86.910465, 40.435776]],
//       attributionControl: false // Disable the default attribution control
//     });

//     // Add 3D building layer
//     map.on('load', () => {
//       console.log('Map loaded');
//       // Add a 3D building layer
//       map.addLayer({
//         id: '3d-buildings',
//         source: 'composite',
//         'source-layer': 'building',
//         filter: ['==', 'extrude', 'true'],
//         type: 'fill-extrusion',
//         minzoom: 15,
//         paint: {
//           'fill-extrusion-color': '#aaa',
//           'fill-extrusion-height': ['get', 'height'],
//           'fill-extrusion-base': ['get', 'min_height'],
//           'fill-extrusion-opacity': 0.8
//         }
//       });
//     });

//     // Add markers for each event
//     events.forEach((event) => {
//       console.log("this event is ", event)
//       const { location, title, description } = event; // Update to 'location'
//       const [lng, lat] = location.split(',').map(parseFloat); // Assuming location is a string like "lng, lat"

//       // Create a marker
//       const marker = new mapboxgl.Marker()
//         .setLngLat([lng, lat])
//         .setPopup(new mapboxgl.Popup().setHTML(`<h3>${title}</h3><p>${description}</p>`))
//         .addTo(map);
//     });

//     // Cleanup the map when the component unmounts
//     return () => map.remove();

//   }, []); // The empty dependency array ensures that this effect runs once

//   return <div id="map" style={{ width: '100%', height: '650px' }} />;
// };

// export default Map;


import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useAuthContext } from '../hooks/useAuthContext';

const Map = () => {
  const { user } = useAuthContext();

  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setEvents(json);
      } else {
        console.error('Failed to fetch events:', response.status);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    // Fetch events data on component mount
    fetchEvents();
  }, [user.token]);

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
        const { location, title, description } = event;
        const [lng, lat] = location.split(',').map(parseFloat);

        // Create a marker
        const marker = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${title}</h3><p>${description}</p>`))
          .addTo(map);
      });
    });

    // Cleanup the map when the component unmounts
    return () => map.remove();
  }, [events]); // The effect now depends on the events state

  return <div id="map" style={{ width: '100%', height: '650px' }} />;
};

export default Map;
