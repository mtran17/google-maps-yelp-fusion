import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import './Map.css'

const Map = ({ onLatLngChange }) => {
  const [clickedLatLng, setClickedLatLng] = useState({ lat: 33.88134, lng: -117.8818 });
  const [radius, setRadius] = useState(10000);
  const [circle, setCircle] = useState(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCUnmqTkhklqvM0P2AjfHMVyx7bxBmMwio&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        initMap();
      };
    };


    const initMap = () => {
        if (window.google && window.google.maps && window.google.maps.Map) {
            const position = { lat: 33.88134, lng: -117.8818 };
            const map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: position,
            mapId: 'DEMO_MAP_ID',
            });

            
            /* not adjustable yet */
            const initCircle = new window.google.maps.Circle({
                strokeColor: "#083D77",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#083D77",
                fillOpacity: 0.15,
                map,
                center: position,
                radius: radius,    // radius range should be 1000 to 38000
            });

            setCircle(initCircle);

            let infoWindow = new window.google.maps.InfoWindow({
                content: "Click the map to get Lat/Lng!",
                position: position,
            });

            infoWindow.open(map);

            setClickedLatLng(position);
            onLatLngChange(position);

            map.addListener('click', (clickEvent) => {
              // Close the previous infoWindow
              infoWindow.close();
          
              const lat = clickEvent.latLng.lat();
              const lng = clickEvent.latLng.lng();
              
              const clickedLatLng = { lat, lng };

              // Create a new infoWindow for the clicked location
              infoWindow = new window.google.maps.InfoWindow({
                  position: clickedLatLng,
                  center: position,
              });
          
              // Update the map with the clicked location
              map.panTo(clickEvent.latLng);
              setClickedLatLng(clickedLatLng);
              onLatLngChange(clickedLatLng);
          
              // Set content for the infoWindow with the clicked coordinates
              const currLatLng = JSON.stringify(clickEvent.latLng.toJSON(), null, 2);
              infoWindow.setContent(currLatLng);
          
              // Set center for the adjustableCircle
              initCircle.setCenter(clickEvent.latLng);
          
              // Open the new infoWindow on the map
              infoWindow.open(map);
          
              // Log the clicked coordinates
              console.log('Map clicked: ', currLatLng);
            });

      } else {
        console.error('Error: google.maps.Map not defined');
      }
    };

    if (window.google && window.google.maps) {
      initMap();
    } else {
      loadGoogleMapsScript();
    }

  }, []); 

  const handleRadiusChange = (event, newValue) => {
    setRadius(newValue);
    if (circle) {
      circle.setRadius(newValue);
    }
  };

  return (
    <div>
      <div id="map"></div>

      <div className="clicked-coordinates">
      {clickedLatLng && (
        <div className='coordinate-text'>
          <p>Clicked Coordinates:</p>
          <p>Latitude: {clickedLatLng.lat}</p>
          <p>Longitude: {clickedLatLng.lng}</p>
        </div>
      )}
        <div className='slider'>
          <Slider
            value={radius}
            min={1000}    // minimum radius value
            max={38000}   // maximum radius value
            step={1000}   // step size for the slider
            onChange={handleRadiusChange}
            valueLabelDisplay="on"
            aria-labelledby="radius-slider"
          />
        </div>
      </div>

    </div>
  );
};

export default Map;
