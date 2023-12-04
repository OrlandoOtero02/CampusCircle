// components/Map.js

import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const Map = () => {
  useEffect(() => {
    // Set your Mapbox access token here
    mapboxgl.accessToken = 'pk.eyJ1Ijoib3VvdGVybyIsImEiOiJjbHByaTM1c2owNzd1MnZuem9hMmQyZnRtIn0.PaxC4oEBghK-pUjAeZnPrA';

    // Create a new map instance
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    // Cleanup the map when the component unmounts
    return () => map.remove();
  }, []); // The empty dependency array ensures that this effect runs once

  return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default Map;
