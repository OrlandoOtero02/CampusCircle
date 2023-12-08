// components/Map.js
import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const Map = () => {
  const hardcodedEvents = [
    {
      title: 'Event 1',
      description: 'This is the first event',
      coordinates: [-86.913780, 40.428640],
    },
    {
      title: 'Event 2',
      description: 'Another event at a different location',
      coordinates: [-86.913790, 40.428650],
    },
    {
      title: 'Event 3',
      description: 'Event with a unique description',
      coordinates: [-86.913800, 40.428660],
    },
  ];

  const [events, setEvents] = useState(hardcodedEvents);


  useEffect(() => {
    // Fetch events data (replace with your actual API call)
    // const fetchEvents = async () => {
    //   // Fetch events associated with the user and set them in the state
    //   const eventsData = await fetch('/api/events'); // Replace with your API endpoint
    //   const eventsJson = await eventsData.json();
    //   setEvents(eventsJson);
    // };

    // fetchEvents();
    
    // Set your Mapbox access token here
    mapboxgl.accessToken = 'pk.eyJ1Ijoib3VvdGVybyIsImEiOiJjbHByazhzc2IwMGt4MmtvNmRzbWJqOXVvIn0.RJRdRiC_gkuahLAsrkbDFA';

    // Create a new map instance
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/standard', // 3D style URL
      center: [-86.913780, 40.428640], // starting position [lng, lat]
      zoom: 18, // starting zoom,
      pitch: 45, // starting pitch in degrees
      maxBounds: [[-86.930515, 40.420158], [-86.910465, 40.435776]],
      attributionControl: false // Disable the default attribution control
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
          'fill-extrusion-opacity': 0.8
        }
      });
    });

    console.log('Events:', events);
    // Add markers for each event
    events.forEach((event) => {
      const { coordinates, title, description } = event;
      console.log('Marker Position:', coordinates);
      // Create a marker
      
      const marker = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${title}</h3><p>${description}</p>`))
        .addTo(map);
  
      // Use LngLat expressions to bind the marker position to the map's current state
      marker.setLngLat(coordinates)
        .addTo(map);
    });

    // Cleanup the map when the component unmounts
    return () => map.remove();

  }, []); // The empty dependency array ensures that this effect runs once

  return <div id="map" style={{ width: '100%', height: '650px' }} />;
};

export default Map;

// import React, { useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';

// const Map = () => {
//   useEffect(() => {
//     mapboxgl.accessToken = 'pk.eyJ1Ijoib3VvdGVybyIsImEiOiJjbHByazhzc2IwMGt4MmtvNmRzbWJqOXVvIn0.RJRdRiC_gkuahLAsrkbDFA';

//     const map = new mapboxgl.Map({
//       container: 'map',
//       style: 'mapbox://styles/mapbox/streets-v12',
//       center: [12.550343, 55.665957],
//       zoom: 8
//     });

//     // Create a default Marker and add it to the map.
//     const marker = new mapboxgl.Marker()
//       .setLngLat([12.554729, 55.70651])
//       .addTo(map);

//     // Cleanup the map when the component unmounts
//     return () => map.remove();

//   }, []); // The empty dependency array ensures that this effect runs once

//   return <div id="map" style={{ width: '100%', height: '650px' }} />;
// };

// export default Map;
