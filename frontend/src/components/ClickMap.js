// import React, { useEffect, useState } from 'react';
// import mapboxgl from 'mapbox-gl';

// const ClickMap = () => {
//   const [clickedLocation, setClickedLocation] = useState(null);

//   useEffect(() => {
//     mapboxgl.accessToken = 'pk.eyJ1Ijoib3VvdGVybyIsImEiOiJjbHByazhzc2IwMGt4MmtvNmRzbWJqOXVvIn0.RJRdRiC_gkuahLAsrkbDFA';

//     const map = new mapboxgl.Map({
//       container: 'map',
//       style: 'mapbox://styles/mapbox/standard',
//       center: [-86.913780, 40.428640],
//       zoom: 18,
//       pitch: 45,
//       maxBounds: [[-86.930515, 40.420158], [-86.910465, 40.435776]],
//       attributionControl: false // Disable the default attribution control
//     });

//     map.on('load', () => {
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

//     // Event listener for map click
//     map.on('click', (e) => {
//       const { lng, lat } = e.lngLat;
//       setClickedLocation({ lng, lat });

//       // Update the input box with coordinates
//       document.getElementById('coordinatesInput').value = `${lng.toFixed(6)}, ${lat.toFixed(6)}`;
//     });

//     // Cleanup the map when the component unmounts
//     return () => map.remove();
//   }, []);

//   return (
//     <div>
//       <div id="map" style={{ width: '100%', height: '650px' }} />
//       <form>
//         <label>
//           Coordinates:
//           <input type="text" id="coordinatesInput" readOnly />
//         </label>
//       </form>
//     </div>
//   );
// };

// export default ClickMap;




// ClickMap.js
import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const ClickMap = ({ onLocationClick }) => {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoib3VvdGVybyIsImEiOiJjbHByazhzc2IwMGt4MmtvNmRzbWJqOXVvIn0.RJRdRiC_gkuahLAsrkbDFA';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/standard',
      center: [-86.913780, 40.428640],
      zoom: 18,
      pitch: 45,
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
      onLocationClick({ lng, lat }); // Pass the location to the callback function
    });

    // Cleanup the map when the component unmounts
    return () => map.remove();
  }, [onLocationClick]);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '650px' }} />
      <form>
        <label>
          Coordinates:
          <input type="text" id="coordinatesInput" readOnly />
        </label>
      </form>
    </div>
  );
};

export default ClickMap;

