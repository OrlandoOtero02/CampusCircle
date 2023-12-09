// components/Map.js

import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const Map = () => {
  useEffect(() => {
    // Set your Mapbox access token here
    mapboxgl.accessToken = 'pk.eyJ1Ijoib3VvdGVybyIsImEiOiJjbHByazhzc2IwMGt4MmtvNmRzbWJqOXVvIn0.RJRdRiC_gkuahLAsrkbDFA';

    // Create a new map instance
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/standard', // 3D style URL
      center: [-86.913780, 40.428640], // starting position [lng, lat]
      zoom: 18, // starting zoom,
      pitch: 45, // starting pitch in degrees
      maxBounds: [[-86.930515, 40.420158], [-86.910465, 40.435776]]
    });

    // Add 3D building layer
    map.on('load', () => {
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

    // Cleanup the map when the component unmounts
    return () => map.remove();
  }, []); // The empty dependency array ensures that this effect runs once

  return <div id="map" style={{ width: '100%', height: '650px' }} />;
};

export default Map;
